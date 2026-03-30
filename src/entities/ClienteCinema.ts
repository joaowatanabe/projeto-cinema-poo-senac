export class ClienteCinema {
    id: number;
    nome: string;
    cpf: number;
    idade: number;
    ativo: boolean;

constructor(id: number, cpf: number) {
    this.id = id;
    this.nome = "";
    this.cpf = 0;
    this.idade = 0;
    this.ativo = true;
    };
};
