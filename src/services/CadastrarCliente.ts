import { ClienteCinema } from "../entities/ClienteCinema";
import { ClienteVip } from "../entities/ClienteVip";

export class Clientes {
  private clientes: (ClienteCinema | ClienteVip)[] = [];

  constructor(clientesIniciais: ClienteCinema[] = []) {
    this.clientes = clientesIniciais;
  }

  public adicionarCliente(cliente: ClienteCinema | ClienteVip): string {
    this.clientes.push(cliente);
    const tag = cliente instanceof ClienteVip ? " [VIP]" : "";
    return `\nCliente "${cliente.nome}"${tag} adicionado com sucesso ao Sistema\n`;
  }

  public listarClientes(): string {
    if (this.clientes.length === 0) {
      return `\nNenhum Cliente cadastrado no Sistema!\n`;
    }

    let resultado = "\n--- Catálogo de Clientes ---\n";
    this.clientes.forEach((c) => {
      if (c instanceof ClienteVip) {
        const plano = c.anual ? "Anual" : c.mensalidade ? "Mensal" : "Inativo";
        resultado += `[${c.id}] ${c.nome} | CPF: ${c.cpf} | Idade: ${c.idade} | VIP 👑 Plano: ${plano}\n`;
      } else {
        resultado += `[${c.id}] ${c.nome} | CPF: ${c.cpf} | Idade: ${c.idade} | Estudante: ${c.estudante ? "Sim" : "Não"}\n`;
      }
    });
    return resultado;
  }

  public excluirCliente(id: number): string {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      const removido = this.clientes.splice(index, 1);
      return `\nCliente "${removido[0].nome}" excluído do Sistema!\n`;
    }
    return `\nErro: Nenhum Cliente encontrado com este ID no Sistema.\n`;
  }

  public editarCliente(
    id: number,
    dados: {
      nome?: string;
      idade?: number;
      estudante?: boolean;
      mensalidade?: boolean;
      anual?: boolean;
    },
  ): string {
    const cliente = this.clientes.find((c) => c.id === id);
    if (!cliente) return `\nErro: Cliente com ID ${id} não encontrado.\n`;

    if (dados.nome !== undefined) cliente.nome = dados.nome;
    if (dados.idade !== undefined) cliente.idade = dados.idade;

    if (cliente instanceof ClienteVip) {
      if (dados.mensalidade !== undefined)
        cliente.mensalidade = dados.mensalidade;
      if (dados.anual !== undefined) cliente.anual = dados.anual;
    } else {
      if (dados.estudante !== undefined) cliente.estudante = dados.estudante;
    }

    return `\nCliente "${cliente.nome}" atualizado com sucesso!\n`;
  }

  public buscarPorId(id: number): ClienteCinema | undefined {
    return this.clientes.find((c) => c.id === id);
  }
}
