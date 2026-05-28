import { ICrud } from "../interfaces/ICrud";
import { IEditavel } from "../interfaces/IEditavel";
import { Filme } from "../entities/Filme";
import { FilmeAdulto } from "../entities/FilmeAdulto";

type DadosEdicaoFilme = {
  titulo?: string;
  classificacao?: number;
  duracaoMinutos?: number;
  sinopse?: string;
  ativo?: boolean;
};

export class CadastrarFilmeService
  implements ICrud<Filme>, IEditavel<DadosEdicaoFilme>
{
  private filmes: Filme[];

  constructor(filmesIniciais: Filme[] = []) {
    this.filmes = filmesIniciais;
  }

  public adicionar(filme: Filme): string {
    this.filmes.push(filme);
    const tag = filme instanceof FilmeAdulto ? " [+18]" : "";
    return `\nFilme "${filme.titulo}"${tag} adicionado ao catálogo!\n`;
  }

  public adicionarFilme(filme: Filme): string {
    return this.adicionar(filme);
  }

  public listar(): string {
    if (this.filmes.length === 0)
      return `\nNenhum filme cadastrado no momento.\n`;
    let resultado = "\n--- Catálogo de Filmes ---\n";
    this.filmes.forEach((f) => {
      const tag = f instanceof FilmeAdulto ? " 🔞" : "";
      resultado += `[${f.id}] ${f.titulo}${tag} | Classificação: ${f.classificacao}+ | Duração: ${f.duracaoMinutos}min | Ativo: ${f.ativo ? "Sim" : "Não"}\n`;
    });
    return resultado;
  }

  public listarFilmes(): string {
    return this.listar();
  }

  public excluir(id: number): string {
    const index = this.filmes.findIndex((f) => f.id === id);
    if (index !== -1) {
      const removido = this.filmes.splice(index, 1);
      return `\nFilme "${removido[0].titulo}" excluído com sucesso!\n`;
    }
    return `\nErro: Nenhum filme encontrado com este ID.\n`;
  }

  public excluirFilme(id: number): string {
    return this.excluir(id);
  }

  public buscarPorId(id: number): Filme | undefined {
    return this.filmes.find((f) => f.id === id);
  }

  public editar(id: number, dados: DadosEdicaoFilme): string {
    const filme = this.filmes.find((f) => f.id === id);
    if (!filme) return `\nErro: Filme com ID ${id} não encontrado.\n`;
    try {
      if (dados.titulo !== undefined) filme.titulo = dados.titulo;
      if (dados.classificacao !== undefined)
        filme.classificacao = dados.classificacao;
      if (dados.duracaoMinutos !== undefined)
        filme.duracaoMinutos = dados.duracaoMinutos;
      if (dados.sinopse !== undefined) filme.sinopse = dados.sinopse;
      if (dados.ativo !== undefined) filme.ativo = dados.ativo;
      return `\nFilme "${filme.titulo}" atualizado com sucesso!\n`;
    } catch (erro) {
      if (erro instanceof Error) return `\nErro: ${erro.message}\n`;
      return `\nErro inesperado ao editar filme.\n`;
    }
  }

  public editarFilme(id: number, dados: DadosEdicaoFilme): string {
    return this.editar(id, dados);
  }
}
