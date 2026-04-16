import { Ingresso } from "../entities/Ingresso";
import { ClienteCinema } from "../entities/ClienteCinema";
import { SessaoFilme } from "../entities/SessaoFilme";

const PRECO_CHEIO = 25.0;
const PRECO_MEIA = PRECO_CHEIO / 2;

export class CadastrarIngresso {
  private ingressos: Ingresso[] = [];

  public emitirIngresso(
    id: number,
    cliente: ClienteCinema,
    sessao: SessaoFilme,
    assento: number,
  ): Ingresso | string {
    if (cliente.idade < sessao.filme.classificacao) {
      return `\nErro: Cliente não tem idade mínima para este filme (${sessao.filme.classificacao} anos).\n`;
    }

    if (!sessao.assentoDisponivel(assento)) {
      return `\nErro: Assento ${assento} não está disponível.\n`;
    }

    const meiaEntrada = cliente.estudante;
    const valorPago = meiaEntrada ? PRECO_MEIA : PRECO_CHEIO;

    sessao.ocuparAssento(assento);

    const ingresso = new Ingresso(
      id,
      cliente,
      sessao,
      assento,
      meiaEntrada,
      valorPago,
    );
    this.ingressos.push(ingresso);

    return ingresso;
  }

  public listarIngressos(): string {
    if (this.ingressos.length === 0) {
      return `\nNenhum ingresso emitido ainda.\n`;
    }

    let resultado = "\n--- Ingressos Emitidos ---\n";
    this.ingressos.forEach((i) => {
      resultado += `[${i.id}] ${i.cliente.nome} | ${i.sessao.filme.titulo} | Assento: ${i.assento} | ${i.meiaEntrada ? "Meia" : "Inteira"} | R$ ${i.valorPago.toFixed(2)}\n`;
    });
    return resultado;
  }
}
