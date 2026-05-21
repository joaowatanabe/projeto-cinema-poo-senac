import { Filme } from "./Filme";

export class FilmeComum extends Filme {
  constructor(id: number, titulo: string) {
    super(id, titulo);
  }

  public descricao(): string {
    return `🎬 [${this._id}] ${this._titulo} | ${this._classificacao}+ | ${this._duracaoMinutos}min`;
  }
}
