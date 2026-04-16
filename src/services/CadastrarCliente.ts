import { ClienteCinema } from "../entities/ClienteCinema";

export class Clientes {
  private clientes: ClienteCinema[] = [];

  public adicionarCliente(cliente: ClienteCinema): string {
    this.clientes.push(cliente);
    return `\nCliente "${cliente.nome}" adicionado com sucesso ao Sistema\n`;
  }

  public listarCliente(): string {
    if (this.clientes.length === 0) {
      return `\nNenhum Cliente cadastrado no Sistema!`;
    }
    let resultado = "\n--- Catálogo de Clientes---";
    this.clientes.forEach((c) => {
      resultado += `[${c.id}] ${c.nome} | CPF: ${c.cpf} | Idade: ${c.idade} | Estudante: ${c.estudante ? "Sim" : "Não"}\n`;
    });
    return resultado;
  }

  public excluirCliente(id: number): string {
    const index = this.clientes.findIndex((c) => c.id === id);

    if (index !== -1) {
      const removido = this.clientes.splice(index, 1);
      return `\nCliente "${removido[0].nome} excluído do Sistema!"`;
    } else {
      return `\nErro: Nenhum Cliente encontrado com este ID no Sistema.\n`;
    }
  }

  public buscarPorId(id: number): ClienteCinema | undefined {
    return this.clientes.find((c) => c.id === id);
  }
}
