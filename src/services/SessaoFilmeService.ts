import { SessaoFilme } from "../entities/SessaoFilme";

export class SessaoFilmeService {
  private sessoes: SessaoFilme[] = [];

  public adicionarSessao(sessao: SessaoFilme): string {
    this.sessoes.push(sessao);
    return `\nSessão do filme "${sessao.filme.titulo}" adicionada com sucesso!\n`;
  }

  public listarSessoes(): string {
    if (this.sessoes.length === 0) {
      return `\nNenhuma sessão cadastrada no momento.\n`;
    }

    let resultado = "\n--- Sessões Disponíveis ---\n";
    this.sessoes.forEach((s) => {
      const livres = s.totalAssentos - s.assentosOcupados.length;
      resultado += `[${s.id}] ${s.filme.titulo} | ${s.horario} | Sala: ${s.sala} | Livres: ${livres}/${s.totalAssentos}\n`;
    });
    return resultado;
  }

  public buscarPorId(id: number): SessaoFilme | undefined {
    return this.sessoes.find((s) => s.id === id);
  }

  public excluirSessao(id: number): string {
    const index = this.sessoes.findIndex((s) => s.id === id);

    if (index !== -1) {
      const removida = this.sessoes.splice(index, 1);
      return `\nSessão "${removida[0].filme.titulo} - ${removida[0].horario}" removida!\n`;
    }
    return `\nErro: Nenhuma sessão encontrada com este ID.\n`;
  }
}
