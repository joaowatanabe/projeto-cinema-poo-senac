import { Clientes } from "../services/CadastrarCliente";
import { ClienteCinema } from "../entities/ClienteCinema";
import { Filme } from "../entities/Filme";
import { CadastrarFilmeService } from "../services/CadastrarFilmeService";
import prompt from "prompt-sync";

export class MenuCinema {
    novoCliente;
    pergunta;
    cadFilmeService;

    constructor() {
    this.novoCliente = new Clientes();

    this.cadFilmeService = new CadastrarFilmeService();
        
    this.pergunta = prompt(); 
    }

    iniciar() {
        while (true) {
            console.log("\n--- MENU CINEMA ---");
            console.log("1. Criar Filme");
            console.log("2. Lista de Filmes");
            console.log("3. Criar Cliente");
            console.log("4. Listar Clientes");
            console.log("5. Excluir Filme");
            console.log("6. Excluir Cliente");
            console.log("0. Sair");

            const escolha = +this.pergunta("Digite a Opção que Deseja: ");
            
            switch (escolha) {
                case 1:
                    this.criarFilme();
                    break;

                case 2:
                    this.cadFilmeService.listarFilmes();
                    break;

                case 3:
                    this.criarCliente();
                    break;

                case 4:
                    this.novoCliente.listarCliente();
                    break;

                case 5:
                    const idExcluir = +this.pergunta("Digite o ID do filme que deseja excluir: ");
                    this.cadFilmeService.excluirFilme(idExcluir);
                    break;

                case 6:
                    this.excluirCliente();
                    break;
                
                case 0:
                    console.log("Saindo do sistema...");
                    process.exit(0);
                    
                default:
                    console.log("\nOpção Inválida\n");
                    break;
            }
        }
    }
    
private criarFilme() {
    const id = +this.pergunta("ID do Filme: ");
    const titulo = this.pergunta("Qual o Título do Filme: ");
                    
    const novoFilme = new Filme(id, titulo);
    novoFilme.classificacao = +this.pergunta("Qual a Classificação do Filme: ");
    novoFilme.duracaoMinutos = +this.pergunta("Qual a Duração do Filme em Minutos: ");
    novoFilme.sinopse = this.pergunta("Qual a Sinopse do Filme: ");
    novoFilme.ativo = this.pergunta("O Filme está Ativo? (S/N): ").toLowerCase() === "s";

    this.cadFilmeService.adicionarFilme(novoFilme);
};

private criarCliente() {
    const idCli = +this.pergunta("ID do Cliente: ");
    const cliCpf = this.pergunta("CPF do Cliente: ");

    const novoCliente = new ClienteCinema(idCli, cliCpf);
    novoCliente.nome = this.pergunta("Qual o nome do Cliente: ");
    novoCliente.idade = +this.pergunta("Qual a idade do Cliente: ");

    this.novoCliente.adicionarCliente(novoCliente);
};

private excluirCliente() {
    const idCliExcluir = +this.pergunta("Digite o ID do cliente que deseja excluir: ");
    this.novoCliente.excluirCliente(idCliExcluir);
};
};