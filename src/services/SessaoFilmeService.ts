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

  public editarSessao(
    id: number,
    dados: { horario?: string; sala?: string; totalAssentos?: number },
  ): string {
    const sessao = this.sessoes.find((s) => s.id === id);
    if (!sessao) return `\nErro: Sessão com ID ${id} não encontrada.\n`;

    if (dados.horario !== undefined) sessao.horario = dados.horario;
    if (dados.sala !== undefined) sessao.sala = dados.sala;
    if (dados.totalAssentos !== undefined) {
      if (dados.totalAssentos < sessao.assentosOcupados.length) {
        return `\nErro: Total de assentos não pode ser menor que os já ocupados (${sessao.assentosOcupados.length}).\n`;
      }
      sessao.totalAssentos = dados.totalAssentos;
    }

    return `\nSessão [${sessao.id}] ${sessao.filme.titulo} - ${sessao.horario} atualizada com sucesso!\n`;
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
