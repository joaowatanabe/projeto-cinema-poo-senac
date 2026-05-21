import { Filme } from "./Filme";

export class FilmeAdulto extends Filme {
  private _conteudoAdulto: boolean;

  constructor(id: number, titulo: string) {
    super(id, titulo);
    this._classificacao = 18;
    this._conteudoAdulto = true;
  }

  public descricao(): string {
    return `[${this._id}] ${this._titulo} | +18 | ${this._duracaoMinutos}min`;
  }

  public get conteudoAdulto(): boolean {
    return this._conteudoAdulto;
  }
  public set conteudoAdulto(valor: boolean) {
    this._conteudoAdulto = valor;
  }

  public override set classificacao(valor: number) {
    if (valor < 18) {
      throw new Error("FilmeAdulto não pode ter classificação menor que 18.");
    }
    this._classificacao = valor;
  }

  public override get classificacao(): number {
    return this._classificacao;
  }
}
