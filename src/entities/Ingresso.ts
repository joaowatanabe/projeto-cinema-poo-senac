import { ClienteCinema } from "./ClienteCinema";
import { SessaoFilme } from "./SessaoFilme";

export class Ingresso {
  id: number;
  cliente: ClienteCinema;
  sessao: SessaoFilme;
  assento: number;
  meiaEntrada: boolean;
  valorPago: number;

  constructor(
    id: number,
    cliente: ClienteCinema,
    sessao: SessaoFilme,
    assento: number,
    meiaEntrada: boolean,
    valorPago: number,
  ) {
    this.id = id;
    this.cliente = cliente;
    this.sessao = sessao;
    this.assento = assento;
    this.meiaEntrada = meiaEntrada;
    this.valorPago = valorPago;
  }
}
