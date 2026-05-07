import { ClienteCinema } from "./ClienteCinema";

export class ClienteVip extends ClienteCinema {
    private _mensalidade: boolean;
    private _anual: boolean;

    constructor(id: number, cpf: string, mensalidade: boolean, anual: boolean) {
        super(id, cpf);
        this._mensalidade = mensalidade;
        this._anual = anual;
    }
}