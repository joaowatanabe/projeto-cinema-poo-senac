import { ClienteCinema } from "./ClienteCinema";

export class ClienteVip extends ClienteCinema {
  private _mensalidade: boolean;
  private _anual: boolean;

  constructor(id: number, cpf: string, mensalidade: boolean, anual: boolean) {
    super(id, cpf);
    this._mensalidade = mensalidade;
    this._anual = anual;
  }

  public descricao(): string {
    const plano = this._anual
      ? "Anual"
      : this._mensalidade
        ? "Mensal"
        : "Inativo";
    return `[${this._id}] ${this._nome} | VIP Plano: ${plano}`;
  }

  public get mensalidade(): boolean {
    return this._mensalidade;
  }
  public set mensalidade(valor: boolean) {
    this._mensalidade = valor;
  }
  public get anual(): boolean {
    return this._anual;
  }
  public set anual(valor: boolean) {
    this._anual = valor;
  }
  public get planoAtivo(): boolean {
    return this._mensalidade || this._anual;
  }
}
