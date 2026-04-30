import { ClienteCinema } from "./ClienteCinema";
import { SessaoFilme } from "./SessaoFilme";

export class Ingresso {
  private _id: number;
  private _cliente: ClienteCinema;
  private _sessao: SessaoFilme;
  private _assento: number;
  private _meiaEntrada: boolean;
  private _valorPago: number;
  constructor(
    id: number,
    cliente: ClienteCinema,
    sessao: SessaoFilme,
    assento: number,
    meiaEntrada: boolean,
    valorPago: number,
  ) {
    this._id = id;
    this._cliente = cliente;
    this._sessao = sessao;
    this._assento = assento;
    this._meiaEntrada = meiaEntrada;
    this._valorPago = valorPago;
  }
  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get cliente(): ClienteCinema {
    return this._cliente;
  } 

  public set cliente(cliente: ClienteCinema) {
    this._cliente = cliente;
  }

  public get sessao(): SessaoFilme {
    return this._sessao;
  }

  public set sessao(sessao: SessaoFilme) {
    this._sessao = sessao;
  }

  public get assento(): number {
    return this._assento;
  }

  public set assento(assento: number) {
    this._assento = assento;
  }

  public get meiaEntrada(): boolean {
    return this._meiaEntrada;
  }

  public set meiaEntrada(meiaEntrada: boolean) {
    this._meiaEntrada = meiaEntrada;
  }

  public get valorPago(): number {
    return this._valorPago; 
  }

  public set valorPago(valorPago: number) {
    this._valorPago = valorPago;
  }
}

