import prompt from "prompt-sync";
import { ClienteCinema } from "../entities/ClienteCinema";
import { Filme } from "../entities/Filme";
import { SessaoFilme } from "../entities/SessaoFilme";
import { Clientes } from "../services/CadastrarCliente";
import { CadastrarFilmeService } from "../services/CadastrarFilmeService";
import { SessaoFilmeService } from "../services/SessaoFilmeService";
import { CadastrarIngresso } from "../services/CadastrarIngresso";
import { SalaCinema } from "./SalaCinema";
import { FilmeAdulto } from "../entities/FilmeAdulto";
import { ClienteVip } from "../entities/ClienteVip";
import { ClienteComum } from "../entities/ClienteComum";
import { FilmeComum } from "../entities/FilmeComum";

export class MenuCinema {
  private pergunta = prompt();
  private clienteService: Clientes;
  private filmeService: CadastrarFilmeService;
  private sessaoService = new SessaoFilmeService();
  private ingressoService = new CadastrarIngresso();

  constructor(
    clientesIniciais: ClienteCinema[] = [],
    filmesIniciais: Filme[] = [],
  ) {
    this.clienteService = new Clientes(clientesIniciais);
    this.filmeService = new CadastrarFilmeService(filmesIniciais);
  }

  public iniciar(): void {
    while (true) {
      console.log("\n========== MENU CINEMA ==========");
      console.log("---- Filmes ----");
      console.log("1. Cadastrar Filme");
      console.log("2. Listar Filmes");
      console.log("3. Editar Filme");
      console.log("4. Excluir Filme");
      console.log("---- Sessões ----");
      console.log("5. Cadastrar Sessão");
      console.log("6. Listar Sessões");
      console.log("7. Editar Sessão");
      console.log("8. Excluir Sessão");
      console.log("---- Clientes ----");
      console.log("9. Cadastrar Cliente");
      console.log("10. Listar Clientes");
      console.log("11. Editar Cliente");
      console.log("12. Excluir Cliente");
      console.log("---- Ingressos ----");
      console.log("13. Comprar Ingresso");
      console.log("14. Listar Ingressos");
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
          this.editarFilme();
          break;
        case 4:
          this.deletarFilme();
          break;
        case 5:
          this.criarSessao();
          break;
        case 6:
          console.log(this.sessaoService.listarSessoes());
          break;
        case 7:
          this.editarSessao();
          break;
        case 8:
          this.deletarSessao();
          break;
        case 9:
          this.criarCliente();
          break;
        case 10:
          console.log(this.clienteService.listarClientes());
          break;
        case 11:
          this.editarCliente();
          break;
        case 12:
          this.deletarCliente();
          break;
        case 13:
          this.comprarIngresso();
          break;
        case 14:
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
    const classificacao = +this.pergunta(
      "Classificação etária (0, 10, 12, 14, 16, 18): ",
    );
    const duracaoMinutos = +this.pergunta("Duração em minutos: ");
    const sinopse = this.pergunta("Sinopse: ");
    const ativo = this.pergunta("Ativo? (S/N): ").toLowerCase() === "s";

    let novoFilme: Filme;
    if (classificacao >= 18) {
      novoFilme = new FilmeAdulto(id, titulo);
    } else {
      novoFilme = new FilmeComum(id, titulo);
      novoFilme.classificacao = classificacao;
    }

    novoFilme.duracaoMinutos = duracaoMinutos;
    novoFilme.sinopse = sinopse;
    novoFilme.ativo = ativo;

    console.log(this.filmeService.adicionarFilme(novoFilme));
  }

  private editarFilme(): void {
    console.log(this.filmeService.listarFilmes());
    const id = +this.pergunta("ID do filme a editar: ");

    console.log("(Enter para manter o valor atual)");
    const titulo = this.pergunta("Novo título: ") || undefined;
    const classInput = this.pergunta("Nova classificação: ");
    const classificacao = classInput ? +classInput : undefined;
    const duracaoInput = this.pergunta("Nova duração (min): ");
    const duracaoMinutos = duracaoInput ? +duracaoInput : undefined;
    const sinopse = this.pergunta("Nova sinopse: ") || undefined;
    const ativoInput = this.pergunta("Ativo? (S/N ou Enter): ").toLowerCase();
    const ativo =
      ativoInput === "s" ? true : ativoInput === "n" ? false : undefined;

    console.log(
      this.filmeService.editarFilme(id, {
        titulo,
        classificacao,
        duracaoMinutos,
        sinopse,
        ativo,
      }),
    );
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

  private editarSessao(): void {
    console.log(this.sessaoService.listarSessoes());
    const id = +this.pergunta("ID da sessão a editar: ");

    console.log("(Enter para manter o valor atual)");
    
    const horario = this.pergunta("Novo horário (ex: 19:30): ") || undefined;
    const sala = this.pergunta("Nova sala: ") || undefined;
    const totalInput = this.pergunta("Novo total de assentos: ");
    const totalAssentos = totalInput ? +totalInput : undefined;

    console.log(
      this.sessaoService.editarSessao(id, { horario, sala, totalAssentos }),
    );
  }

  private deletarSessao(): void {
    console.log(this.sessaoService.listarSessoes());
    const id = +this.pergunta("ID da sessão a excluir: ");
    console.log(this.sessaoService.excluirSessao(id));
  }

  private criarCliente(): void {
    const id = +this.pergunta("ID do Cliente: ");
    const cpf = this.pergunta("CPF do Cliente: ");
    const nome = this.pergunta("Nome do Cliente: ");
    const idade = +this.pergunta("Idade do Cliente: ");
    const isVip = this.pergunta("É cliente VIP? (S/N): ").toLowerCase() === "s";

    if (isVip) {
      const mensalidade =
        this.pergunta("Plano Mensal ativo? (S/N): ").toLowerCase() === "s";
      const anual =
        this.pergunta("Plano Anual ativo? (S/N): ").toLowerCase() === "s";
      const novoVip = new ClienteVip(id, cpf, mensalidade, anual);
      novoVip.nome = nome;
      novoVip.idade = idade;
      console.log(this.clienteService.adicionarCliente(novoVip));
    } else {
      const novoCliente = new ClienteComum(id, cpf);
      novoCliente.nome = nome;
      novoCliente.idade = idade;
      novoCliente.estudante =
        this.pergunta("É estudante? (S/N): ").toLowerCase() === "s";
      console.log(this.clienteService.adicionarCliente(novoCliente));
    }
  }

  private editarCliente(): void {
    console.log(this.clienteService.listarClientes());
    const id = +this.pergunta("ID do cliente a editar: ");

    const cliente = this.clienteService.buscarPorId(id);
    if (!cliente) {
      console.log("\nErro: Cliente não encontrado.\n");
      return;
    }

    if (cliente instanceof ClienteVip) {
      const tornar = this.pergunta(
        "Converter para cliente Comum? (S/N): ",
      ).toLowerCase();
      if (tornar === "s") {
        const estInput = this.pergunta("É estudante? (S/N): ").toLowerCase();
        const estudante = estInput === "s";
        console.log(
          this.clienteService.editarCliente(id, {
            tornarComum: true,
            estudante,
          }),
        );
        return;
      }
    } else {
      const tornar = this.pergunta("Promover para VIP? (S/N): ").toLowerCase();
      if (tornar === "s") {
        const mensalidade =
          this.pergunta("Plano Mensal ativo? (S/N): ").toLowerCase() === "s";
        const anual =
          this.pergunta("Plano Anual ativo? (S/N): ").toLowerCase() === "s";
        console.log(
          this.clienteService.editarCliente(id, {
            tornarVip: true,
            mensalidade,
            anual,
          }),
        );
        return;
      }
    }

    console.log("(Enter para manter o valor atual)");
    const nome = this.pergunta("Novo nome: ") || undefined;
    const idadeInput = this.pergunta("Nova idade: ");
    const idade = idadeInput ? +idadeInput : undefined;

    let extras: {
      estudante?: boolean;
      mensalidade?: boolean;
      anual?: boolean;
    } = {};

    if (cliente instanceof ClienteVip) {
      const mensInput = this.pergunta(
        "Plano Mensal ativo? (S/N ou Enter): ",
      ).toLowerCase();
      const anualInput = this.pergunta(
        "Plano Anual ativo? (S/N ou Enter): ",
      ).toLowerCase();
      extras.mensalidade =
        mensInput === "s" ? true : mensInput === "n" ? false : undefined;
      extras.anual =
        anualInput === "s" ? true : anualInput === "n" ? false : undefined;
    } else {
      const estInput = this.pergunta(
        "Estudante? (S/N ou Enter): ",
      ).toLowerCase();
      extras.estudante =
        estInput === "s" ? true : estInput === "n" ? false : undefined;
    }

    console.log(
      this.clienteService.editarCliente(id, { nome, idade, ...extras }),
    );
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
      const tipo =
        resultado.valorPago === 0
          ? "Cortesia VIP 🎟"
          : resultado.meiaEntrada
            ? "Meia Entrada"
            : "Inteira";

      console.log(`\n✔ Ingresso emitido com sucesso!`);
      console.log(`   Cliente : ${resultado.cliente.nome}`);
      console.log(`   Filme   : ${resultado.sessao.filme.titulo}`);
      console.log(
        `   Sessão  : ${resultado.sessao.horario} | Sala: ${resultado.sessao.sala}`,
      );
      console.log(
        `   Assento : ${SalaCinema.numeroParaLabel(resultado.assento)} (nº ${resultado.assento})`,
      );
      console.log(`   Tipo    : ${tipo}`);
      console.log(`   Valor   : R$ ${resultado.valorPago.toFixed(2)}\n`);
    }
  }
}
