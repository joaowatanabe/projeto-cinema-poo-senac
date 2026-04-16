import { Filme } from "../entities/Filme";
import { SessaoFilme } from "../entities/SessaoFilme";

export class CadastrarFilmeService {
  private filmes: Filme[] = [];

  public adicionarFilme(filme: Filme): void {
    this.filmes.push(filme);
    console.log(`\nFilme "${filme.titulo}" adicionado ao catálogo!\n`);
  }

  public listarFilmes(): void {
    if (this.filmes.length === 0) {
      console.log("\nNenhum filme cadastrado no momento.\n");
      return;
    }
    console.log("\n--- Catálogo de Filmes ---");
    console.table(this.filmes);
  }

  public excluirFilme(id: number): void {
    const index = this.filmes.findIndex((f) => f.id === id);

    if (index !== -1) {
      const removido = this.filmes.splice(index, 1);
      console.log(
        `\nFilme "${removido[0].titulo}" excluído com sucesso do cinema!\n`,
      );
    } else {
      console.log("\nErro: Nenhum filme encontrado com este ID no sistema.\n");
    }
  }
}
