import { ClienteCinema } from "./ClienteCinema";
import { SessaoFilme } from "./SessaoFilme";

export class Ingresso {
  constructor(
    id: number,
    cliente: ClienteCinema,
    sessao: SessaoFilme,
    assento: number,
    meiaEntrada: ClienteCinema['estudante'],
    valorPago: number,
  ) {}
}
