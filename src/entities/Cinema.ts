import { ClienteCinema } from "./ClienteCinema";
import { Filme } from "./Filme";

export class Cinema {
    private filmes: Filme[] = []; 

    public adicionarFilme(filme: Filme): void {
        this.filmes.push(filme);
        console.log(`\nFilme "${filme.titulo}" adicionado ao catálogo!\n`);
    }

    public listarFilmes(): void {
        if (this.filmes.length === 0) {
            console.log("\nNenhum filme cadastrado no momento.\n");
            return;
        }
        console.log("\n--- Catálogo de Filmes ---");
        console.table(this.filmes);
    }

    public excluirFilme(id: number): void {
        const index = this.filmes.findIndex(f => f.id === id);

        if (index !== -1) {
            const removido = this.filmes.splice(index, 1);
            console.log(`\nFilme "${removido[0].titulo}" excluído com sucesso do cinema!\n`);
        } else {
            console.log("\nErro: Nenhum filme encontrado com este ID no sistema.\n");
        }
    }

    private clientes: ClienteCinema[] = [];

    public adicionarCliente(cliente: ClienteCinema): void {
        this.clientes.push(cliente);
        console.log(`\nCliente "${cliente.nome}" adicionado com sucesso ao Sistema\n`);
    }

    public listarCliente(): void {
        if(this.clientes.length === 0) {
            console.log(`\nNenhum Cliente cadastrado no Sistema!`);
            return;
        }
        console.log("\n--- Catálogo de Clientes---");
        console.table(this.clientes);
    }

    public excluirCliente(id: number): void {
        const index = this.clientes.findIndex(c => c.id === id);

        if(index !== -1) {
            const removido = this.clientes.splice(index, 1);
            console.log(`\nCliente "${removido[0].nome} excluído do Sistema!"`)
        } else {
            console.log("\nErro: Nenhum Cliente encontrado com este ID no Sistema.\n");
        }
    }
}