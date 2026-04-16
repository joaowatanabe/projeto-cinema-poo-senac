import prompt from "prompt-sync";
import { ClienteCinema } from "../entities/ClienteCinema";
import { Filme } from "../entities/Filme";
import { SessaoFilme } from "../entities/SessaoFilme";
import { Ingresso } from "../entities/Ingresso";
import { Clientes } from "../services/CadastrarCliente";
import { CadastrarFilmeService } from "../services/CadastrarFilmeService";
import { SessaoFilmeService } from "../services/SessaoFilmeService";
import { CadastrarIngresso } from "../services/CadastrarIngresso";
import { SalaCinema } from "./SalaCinema";

export class MenuCinema {
  private pergunta = prompt();
  private clienteService = new Clientes();
  private filmeService = new CadastrarFilmeService();
  private sessaoService = new SessaoFilmeService();
  private ingressoService = new CadastrarIngresso();

  public iniciar(): void {
    while (true) {
      console.log("\n========== MENU CINEMA ==========");
      console.log("---- Filmes ----");
      console.log("1. Cadastrar Filme");
      console.log("2. Listar Filmes");
      console.log("3. Excluir Filme");
      console.log("---- Sessões ----");
      console.log("4. Cadastrar Sessão");
      console.log("5. Listar Sessões");
      console.log("6. Excluir Sessão");
      console.log("---- Clientes ----");
      console.log("7. Cadastrar Cliente");
      console.log("8. Listar Clientes");
      console.log("9. Excluir Cliente");
      console.log("---- Ingressos ----");
      console.log("10. Comprar Ingresso");
      console.log("11. Listar Ingressos");
      console.log("=================================");
      console.log("0. Sair");

      const escolha = +this.pergunta("Digite a opção desejada: ");

      switch (escolha) {
        case 1:
          this.criarFilme();
          break;
        case 2:
          console.log(this.filmeService.listarFilmes());
          break;
        case 3:
          this.deletarFilme();
          break;
        case 4:
          this.criarSessao();
          break;
        case 5:
          console.log(this.sessaoService.listarSessoes());
          break;
        case 6:
          this.deletarSessao();
          break;
        case 7:
          this.criarCliente();
          break;
        case 8:
          console.log(this.clienteService.listarClientes());
          break;
        case 9:
          this.deletarCliente();
          break;
        case 10:
          this.comprarIngresso();
          break;
        case 11:
          console.log(this.ingressoService.listarIngressos());
          break;
        case 0:
          console.log("\nSaindo do sistema... Até logo!\n");
          process.exit(0);
        default:
          console.log("\nOpção inválida. Tente novamente.\n");
      }
    }
  }

  private criarFilme(): void {
    const id = +this.pergunta("ID do Filme: ");
    const titulo = this.pergunta("Título do Filme: ");

    const novoFilme = new Filme(id, titulo);
    novoFilme.classificacao = +this.pergunta("Classificação etária: ");
    novoFilme.duracaoMinutos = +this.pergunta("Duração em minutos: ");
    novoFilme.sinopse = this.pergunta("Sinopse: ");
    novoFilme.ativo = this.pergunta("Ativo? (S/N): ").toLowerCase() === "s";

    console.log(this.filmeService.adicionarFilme(novoFilme));
  }

  private deletarFilme(): void {
    console.log(this.filmeService.listarFilmes());
    const id = +this.pergunta("ID do filme a excluir: ");
    console.log(this.filmeService.excluirFilme(id));
  }

  private criarSessao(): void {
    console.log(this.filmeService.listarFilmes());
    const idFilme = +this.pergunta("ID do Filme para a sessão: ");
    const filme = this.filmeService.buscarPorId(idFilme);

    if (!filme) {
      console.log("\nErro: Filme não encontrado.\n");
      return;
    }

    const id = +this.pergunta("ID da Sessão: ");
    const horario = this.pergunta("Horário (ex: 19:30): ");
    const sala = this.pergunta("Nome/número da Sala: ");
    const totalAssentos = +this.pergunta("Total de assentos: ");

    const novaSessao = new SessaoFilme(id, filme, horario, sala, totalAssentos);
    console.log(this.sessaoService.adicionarSessao(novaSessao));
  }

  private deletarSessao(): void {
    console.log(this.sessaoService.listarSessoes());
    const id = +this.pergunta("ID da sessão a excluir: ");
    console.log(this.sessaoService.excluirSessao(id));
  }

  private criarCliente(): void {
    const id = +this.pergunta("ID do Cliente: ");
    const cpf = this.pergunta("CPF do Cliente: ");

    const novoCliente = new ClienteCinema(id, cpf);
    novoCliente.nome = this.pergunta("Nome do Cliente: ");
    novoCliente.idade = +this.pergunta("Idade do Cliente: ");
    novoCliente.estudante =
      this.pergunta("É estudante? (S/N): ").toLowerCase() === "s";

    console.log(this.clienteService.adicionarCliente(novoCliente));
  }

  private deletarCliente(): void {
    console.log(this.clienteService.listarClientes());
    const id = +this.pergunta("ID do cliente a excluir: ");
    console.log(this.clienteService.excluirCliente(id));
  }

  private comprarIngresso(): void {
    console.log(this.clienteService.listarClientes());
    const idCliente = +this.pergunta("ID do Cliente: ");
    const cliente = this.clienteService.buscarPorId(idCliente);

    if (!cliente) {
      console.log("\nErro: Cliente não encontrado.\n");
      return;
    }

    console.log(this.sessaoService.listarSessoes());
    const idSessao = +this.pergunta("ID da Sessão: ");
    const sessao = this.sessaoService.buscarPorId(idSessao);

    if (!sessao) {
      console.log("\nErro: Sessão não encontrada.\n");
      return;
    }

    // Exibe a sala e pede o assento em loop até escolha válida
    let assento = -1;
    while (true) {
      SalaCinema.renderizar(sessao.totalAssentos, sessao.assentosOcupados);

      const input = this.pergunta(
        "Digite o assento (ex: A1, B3) ou 0 para cancelar: ",
      );

      if (input === "0") {
        console.log("\nCompra cancelada.\n");
        return;
      }

      const numero = SalaCinema.labelParaNumero(input);

      if (numero === -1) {
        console.log("\nFormato inválido. Use letra + número, ex: A1\n");
        continue;
      }

      if (!sessao.assentoDisponivel(numero)) {
        console.log("\nEste assento está ocupado. Escolha outro.\n");
        continue;
      }

      // Mostra preview com o assento selecionado destacado
      SalaCinema.renderizar(
        sessao.totalAssentos,
        sessao.assentosOcupados,
        numero,
      );
      const confirmar = this.pergunta(
        `Confirmar assento ${input.toUpperCase()}? (S/N): `,
      );

      if (confirmar.toLowerCase() === "s") {
        assento = numero;
        break;
      }
    }

    const id = +this.pergunta("ID do Ingresso: ");
    const resultado = this.ingressoService.emitirIngresso(
      id,
      cliente,
      sessao,
      assento,
    );

    if (typeof resultado === "string") {
      console.log(resultado);
    } else {
      console.log(`\n✔ Ingresso emitido com sucesso!`);
      console.log(`   Cliente : ${resultado.cliente.nome}`);
      console.log(`   Filme   : ${resultado.sessao.filme.titulo}`);
      console.log(
        `   Sessão  : ${resultado.sessao.horario} | Sala: ${resultado.sessao.sala}`,
      );
      console.log(
        `   Assento : ${SalaCinema.numeroParaLabel(resultado.assento)} (nº ${resultado.assento})`,
      );
      console.log(
        `   Tipo    : ${resultado.meiaEntrada ? "Meia Entrada" : "Inteira"}`,
      );
      console.log(`   Valor   : R$ ${resultado.valorPago.toFixed(2)}\n`);
    }
  }
}
