export class ClienteCinema {
    id: number;
    nome: string;
    cpf: string;
    idade: number;
    ativo: boolean;

constructor(id: number, cpf: string) {
    this.id = id;
    this.nome = "";
    this.cpf = cpf;
    this.idade = 0;
    this.ativo = true;
    };
};
