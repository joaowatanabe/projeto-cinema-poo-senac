import { Filme } from "./Filme";

export class FilmeAdulto extends Filme {
  private _conteudoAdulto: boolean;
  
  constructor(id: number, titulo: string, conteudoAdulto: boolean) {
    super(id, titulo);
    this._conteudoAdulto = conteudoAdulto;
  }
    public set conteudoAdulto(conteudoAdulto: boolean) {
    this._conteudoAdulto = conteudoAdulto;
  }

  public get conteudoAdulto(): boolean {
    return this._conteudoAdulto;
  }

}
