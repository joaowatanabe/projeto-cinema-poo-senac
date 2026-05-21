import { ClienteCinema } from "./ClienteCinema";

export class ClienteComum extends ClienteCinema {
  constructor(id: number, cpf: string) {
    super(id, cpf);
  }

  public descricao(): string {
    return `[${this._id}] ${this._nome} | Estudante: ${this._estudante ? "Sim" : "Não"}`;
  }
}