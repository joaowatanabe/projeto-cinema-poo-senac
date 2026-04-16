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
  ): Ingresso | null {
    if (cliente.idade < sessao.filme.classificacao) {
      console.log(
        `\nErro: Cliente não tem idade mínima para este filme (${sessao.filme.classificacao} anos).\n`,
      );
      return null;
    }

    if (!sessao.assentoDisponivel(assento)) {
      console.log(`\nErro: Assento ${assento} não está disponível.\n`);
      return null;
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

    console.log(`\n✔ Ingresso emitido com sucesso!`);
    console.log(`   Cliente : ${cliente.nome}`);
    console.log(`   Filme   : ${sessao.filme.titulo}`);
    console.log(`   Sessão  : ${sessao.horario} | Sala: ${sessao.sala}`);
    console.log(`   Assento : ${assento}`);
    console.log(`   Tipo    : ${meiaEntrada ? "Meia Entrada" : "Inteira"}`);
    console.log(`   Valor   : R$ ${valorPago.toFixed(2)}\n`);

    return ingresso;
  }

  public listarIngressos(): void {
    if (this.ingressos.length === 0) {
      console.log("\nNenhum ingresso emitido ainda.\n");
      return;
    }
    console.log("\n--- Ingressos Emitidos ---");
    this.ingressos.forEach((i) => {
      console.log(
        `[${i.id}] ${i.cliente.nome} | ${i.sessao.filme.titulo} | Assento: ${i.assento} | R$ ${i.valorPago.toFixed(2)}`,
      );
    });
    console.log("");
  }
}
