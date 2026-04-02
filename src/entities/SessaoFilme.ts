import { Filme } from "./Filme";

export class SessaoFilme {
    id: number;
    nome: string;
    sessoes: SessaoFilme[];

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
        this.sessoes = [];
    }
}
