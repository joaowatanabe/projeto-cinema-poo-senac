import { Ingresso } from "../entities/Ingresso";
import { ClienteCinema } from "../entities/ClienteCinema";
import { SessaoFilme } from "../entities/SessaoFilme";

const PRECO_CHEIO = 25.0;
const PRECO_MEIA = PRECO_CHEIO / 2;

export class CadastrarIngresso {
  private ingresso: Ingresso[] = [];

  public emitirIngresso(
    id: number,
    cliente: ClienteCinema,
    sessao: SessaoFilme,
    assento: number,
  ): Ingresso | null {
    if (cliente.idade < sessao.filme.classificacao) {
      console.log(
        `\nErro: Cliente não tem idade mínima para este filme (${sessao.filme.classificacao} anos).\n`,
      );
      return null;
    }
  }

  if(!sessao.assentoDisponível(assento)) {

  }
}
