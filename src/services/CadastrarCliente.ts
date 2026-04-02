import { ClienteCinema } from "../entities/ClienteCinema";


export class Clientes {
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
};
