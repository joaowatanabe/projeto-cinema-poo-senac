import { Filme } from "../entities/Filme";
import { FilmeAdulto } from "../entities/FilmeAdulto";

export class CadastrarFilmeService {
  private filmes: Filme[] = [];

  // Sem dependência no construtor — limpo e testável
  public adicionarFilme(filme: Filme): string {
    this.filmes.push(filme);
    const tag = filme instanceof FilmeAdulto ? " [+18]" : "";
    return `\nFilme "${filme.titulo}"${tag} adicionado ao catálogo!\n`;
  }

  public listarFilmes(): string {
    if (this.filmes.length === 0) {
      return `\nNenhum filme cadastrado no momento.\n`;
    }

    let resultado = "\n--- Catálogo de Filmes ---\n";
    this.filmes.forEach((f) => {
      const tag = f instanceof FilmeAdulto ? " 🔞" : "";
      resultado += `[${f.id}] ${f.titulo}${tag} | Classificação: ${f.classificacao}+ | Duração: ${f.duracaoMinutos}min | Ativo: ${f.ativo ? "Sim" : "Não"}\n`;
    });
    return resultado;
  }

  public excluirFilme(id: number): string {
    const index = this.filmes.findIndex((f) => f.id === id);
    if (index !== -1) {
      const removido = this.filmes.splice(index, 1);
      return `\nFilme "${removido[0].titulo}" excluído com sucesso!\n`;
    }
    return `\nErro: Nenhum filme encontrado com este ID.\n`;
  }

  public buscarPorId(id: number): Filme | undefined {
    return this.filmes.find((f) => f.id === id);
  }
}
