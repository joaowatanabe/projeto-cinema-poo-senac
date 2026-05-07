import { Filme } from "../entities/Filme";
import { FilmeAdulto } from "../entities/FilmeAdulto";

export class CadastrarFilmeService {
  private filmes: Filme[] = [];
  private filmeAdulto: FilmeAdulto;

  constructor(filmeAdulto: FilmeAdulto) {
    this.filmeAdulto = filmeAdulto;
  }

  public adicionarFilme(filme: Filme): string {
    this.filmes.push(filme);
    return `\nFilme "${filme.titulo}" adicionado ao catálogo!\n`;
  }

  public listarFilmes(): string {
    if (this.filmes.length === 0) {
      return `\nNenhum filme cadastrado no momento.\n`;
    }

    let resultado = "\n--- Catálogo de Filmes ---\n";
    this.filmes.forEach((f) => {
      resultado += `[${f.id}] ${f.titulo} | Classificação: ${f.classificacao}+ | Duração: ${f.duracaoMinutos}min | Ativo: ${f.ativo ? "Sim" : "Não"}\n`;
    });
    return resultado;
  }

  public excluirFilme(id: number): string {
    const index = this.filmes.findIndex((f) => f.id === id);

    if (index !== -1) {
      const removido = this.filmes.splice(index, 1);
      return `\nFilme "${removido[0].titulo}" excluído com sucesso do cinema!\n`;
    }
    return `\nErro: Nenhum filme encontrado com este ID no sistema.\n`;
  }

  public buscarPorId(id: number): Filme | undefined {
    return this.filmes.find((f) => f.id === id);
  }

  public classificacao(classificacao: number) {
    if (classificacao < 18) {
      throw new Error("Classificação para filme adulto deve ser 18 ou mais.");
    }   else {
      this.filmeAdulto.classificacao = classificacao;
    }
  }
}
