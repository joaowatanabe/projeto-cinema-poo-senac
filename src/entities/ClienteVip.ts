import { ClienteCinema } from "./ClienteCinema";

export class ClienteVip extends ClienteCinema {
  private _mensalidade: boolean;
  private _anual: boolean;

  constructor(id: number, cpf: string, mensalidade: boolean, anual: boolean) {
    super(id, cpf);
    this._mensalidade = mensalidade;
    this._anual = anual;
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
