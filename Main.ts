import prompt from "prompt-sync";
import { Filme } from "./src/entities/Filme";
import { Cinema } from "./src/entities/Cinema";
import { ClienteCinema } from "./src/entities/ClienteCinema";

const pergunta = prompt();

const meuCinema = new Cinema(); 

while (true) {
    console.log("1. Criar Filme");
    console.log("2. Lista de Filmes");
    console.log("3. Criar Cliente");
    console.log("4. Listar Clientes");
    console.log("5. Comprar Ingresso");
    console.log("6. Sessões do Filme");
    console.log("7. Excluir Filme");
    console.log("8. Excluir Cliente");
    console.log("0. Sair");

    const escolha = +pergunta("Digite a Opção que Deseja: ");
    
    switch (escolha) {
        case 1:
            const id = +pergunta("ID do Filme: ");
            const titulo = pergunta("Qual o Título do Filme: ");
            
            const novoFilme = new Filme(id, titulo);
            novoFilme.classificacao = +pergunta("Qual a Classificação do Filme: ");
            novoFilme.duracaoMinutos = +pergunta("Qual a Duração do Filme em Minutos: ");
            novoFilme.sinopse = pergunta("Qual a Sinopse do Filme: ");

            meuCinema.adicionarFilme(novoFilme);
            break;

        case 2:
            meuCinema.listarFilmes();
            break;

        case 3:
            const idCli = +pergunta("ID do Cliente: ");
            const cpf = +pergunta("CPF do Cliente: ");

            const novoCliente = new ClienteCinema(idCli, cpf);
            novoCliente.nome = pergunta("Qual o nome do Cliente: ");
            novoCliente.idade = +pergunta("Qual a idade do Cliente: ");

            meuCinema.adicionarCliente(novoCliente);
            break;
            
        case 4:
            meuCinema.listarCliente();
            break;
            
        case 8:
            const idCliExcluir = +pergunta("Digite o ID do cliente que deseja excluir: ");
            meuCinema.excluirCliente(idCliExcluir);
            break;
        
        case 7:
            const idExcluir = +pergunta("Digite o ID do filme que deseja excluir: ");
            meuCinema.excluirFilme(idExcluir);
            break;

        case 0:
            console.log("Saindo do sistema...");
            process.exit(0);
            
        default:
            console.log("\nOpção Inválida\n");
            break;
    }
}