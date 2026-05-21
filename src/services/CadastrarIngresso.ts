import { Ingresso } from "../entities/Ingresso";
import { ClienteCinema } from "../entities/ClienteCinema";
import { ClienteVip } from "../entities/ClienteVip";
import { SessaoFilme } from "../entities/SessaoFilme";
import { FilmeAdulto } from "../entities/FilmeAdulto";

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
    try {
      if (id <= 0) throw new Error("ID do ingresso inválido.");

      if (!Number.isInteger(assento) || assento <= 0) {
        throw new Error(`Número de assento inválido: ${assento}.`);
      }

      if (cliente.idade < sessao.filme.classificacao) {
        const isAdulto = sessao.filme instanceof FilmeAdulto;
        const motivo = isAdulto
          ? `Este filme é classificado como +18 e não é permitido para menores.`
          : `Classificação mínima: ${sessao.filme.classificacao} anos.`;
        throw new Error(`${motivo} Cliente tem ${cliente.idade} anos.`);
      }

      if (!sessao.assentoDisponivel(assento)) {
        throw new Error(`Assento ${assento} não está disponível.`);
      }

      let meiaEntrada = false;
      let valorPago = PRECO_CHEIO;

      if (cliente instanceof ClienteVip && cliente.planoAtivo) {
        valorPago = 0;
      } else if (cliente.estudante) {
        meiaEntrada = true;
        valorPago = PRECO_MEIA;
      }

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
    } catch (erro) {
      if (erro instanceof Error) {
        return `\nErro: ${erro.message}\n`;
      }
      return `\nErro inesperado ao emitir ingresso.\n`;
    }
  }

  public listarIngressos(): string {
    if (this.ingressos.length === 0) {
      return `\nNenhum ingresso emitido ainda.\n`;
    }

    let resultado = "\n--- Ingressos Emitidos ---\n";
    this.ingressos.forEach((i) => {
      const tipo =
        i.valorPago === 0
          ? "Cortesia VIP"
          : i.meiaEntrada
            ? "Meia Entrada"
            : "Inteira";
      resultado += `[${i.id}] ${i.cliente.nome} | ${i.sessao.filme.titulo} | Assento: ${i.assento} | ${tipo} | R$ ${i.valorPago.toFixed(2)}\n`;
    });
    return resultado;
  }
}
