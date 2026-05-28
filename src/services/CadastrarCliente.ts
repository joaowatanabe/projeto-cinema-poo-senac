import { ICrud } from "../interfaces/ICrud";
import { IEditavel } from "../interfaces/IEditavel";
import { ClienteCinema } from "../entities/ClienteCinema";
import { ClienteComum } from "../entities/ClienteComum";
import { ClienteVip } from "../entities/ClienteVip";

type DadosEdicaoCliente = {
  nome?: string;
  idade?: number;
  estudante?: boolean;
  mensalidade?: boolean;
  anual?: boolean;
  tornarVip?: boolean;
  tornarComum?: boolean;
};

export class Clientes
  implements ICrud<ClienteCinema>, IEditavel<DadosEdicaoCliente>
{
  private clientes: ClienteCinema[] = [];

  constructor(clientesIniciais: ClienteCinema[] = []) {
    this.clientes = clientesIniciais;
  }

  public adicionar(cliente: ClienteCinema): string {
    this.clientes.push(cliente);
    const tag = cliente instanceof ClienteVip ? " [VIP]" : "";
    return `\nCliente "${cliente.nome}"${tag} adicionado com sucesso ao Sistema\n`;
  }

  public adicionarCliente(cliente: ClienteCinema): string {
    return this.adicionar(cliente);
  }

  public listar(): string {
    if (this.clientes.length === 0)
      return `\nNenhum Cliente cadastrado no Sistema!\n`;

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

  public listarClientes(): string {
    return this.listar();
  }

  public excluir(id: number): string {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      const removido = this.clientes.splice(index, 1);
      return `\nCliente "${removido[0].nome}" excluído do Sistema!\n`;
    }
    return `\nErro: Nenhum Cliente encontrado com este ID no Sistema.\n`;
  }

  public excluirCliente(id: number): string {
    return this.excluir(id);
  }

  public buscarPorId(id: number): ClienteCinema | undefined {
    return this.clientes.find((c) => c.id === id);
  }

  public editar(id: number, dados: DadosEdicaoCliente): string {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index === -1) return `\nErro: Cliente com ID ${id} não encontrado.\n`;

    let cliente = this.clientes[index];

    if (dados.tornarVip && !(cliente instanceof ClienteVip)) {
      const novoVip = new ClienteVip(
        cliente.id,
        cliente.cpf,
        dados.mensalidade ?? false,
        dados.anual ?? false,
      );
      novoVip.nome = cliente.nome;
      novoVip.idade = cliente.idade;
      novoVip.estudante = cliente.estudante;
      this.clientes[index] = novoVip;
      return `\nCliente "${novoVip.nome}" promovido a VIP com sucesso! 👑\n`;
    }

    if (dados.tornarComum && cliente instanceof ClienteVip) {
      const novoComum = new ClienteComum(cliente.id, cliente.cpf);
      novoComum.nome = cliente.nome;
      novoComum.idade = cliente.idade;
      novoComum.estudante = dados.estudante ?? false;
      this.clientes[index] = novoComum;
      return `\nCliente "${novoComum.nome}" convertido para cliente comum.\n`;
    }

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

  public editarCliente(id: number, dados: DadosEdicaoCliente): string {
    return this.editar(id, dados);
  }
}
