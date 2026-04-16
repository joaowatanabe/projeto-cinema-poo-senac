import { SessaoFilme } from "../entities/SessaoFilme";
import { Filme } from "../entities/Filme";

export class SessaoFilmeService {
  private sessoes: SessaoFilme[] = [];

  public adicionarSessao(sessao: SessaoFilme): void {
    this.sessoes.push(sessao);
    console.log(
      `\nSessão do filme "${sessao.filme.titulo}" adicionada com sucesso!\n`,
    );
  }

  public listarSessoes(): void {
    if (this.sessoes.length === 0) {
      console.log("\nNenhuma sessão cadastrada no momento.\n");
      return;
    }
    console.log("\n--- Sessões Disponíveis ---");
    this.sessoes.forEach((s) => {
      const livres = s.totalAssentos - s.assentosOcupados.length;
      console.log(
        `[${s.id}] ${s.filme.titulo} | ${s.horario} | Sala: ${s.sala} | Assentos livres: ${livres}/${s.totalAssentos}`,
      );
    });
    console.log("");
  }

  public buscarPorId(id: number): SessaoFilme | undefined {
    return this.sessoes.find((s) => s.id === id);
  }

  public excluirSessao(id: number): void {
    const index = this.sessoes.findIndex((s) => s.id === id);

    if (index !== -1) {
      const removida = this.sessoes.splice(index, 1);
      console.log(
        `\nSessão "${removida[0].filme.titulo} - ${removida[0].horario}" removida!\n`,
      );
    } else {
      console.log("\nErro: Nenhuma sessão encontrada com este ID.\n");
    }
  }
}
