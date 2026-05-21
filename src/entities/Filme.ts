import { SessaoFilme } from "./SessaoFilme";

export abstract class Filme {
  protected _id: number;
  protected _titulo: string;
  protected _classificacao: number;
  protected _duracaoMinutos: number;
  protected _sinopse: string;
  protected _ativo: boolean;
  protected _sessoes: SessaoFilme[];

  constructor(id: number, titulo: string) {
    this._id = id;
    this._titulo = titulo;
    this._classificacao = 0;
    this._duracaoMinutos = 0;
    this._sinopse = "";
    this._ativo = true;
    this._sessoes = [];
  }

  public abstract descricao(): string;

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }
  public get titulo(): string {
    return this._titulo;
  }
  public set titulo(titulo: string) {
    this._titulo = titulo;
  }
  public get classificacao(): number {
    return this._classificacao;
  }
  public set classificacao(classificacao: number) {
    this._classificacao = classificacao;
  }
  public get sinopse(): string {
    return this._sinopse;
  }
  public set sinopse(sinopse: string) {
    this._sinopse = sinopse;
  }
  public get duracaoMinutos(): number {
    return this._duracaoMinutos;
  }
  public set duracaoMinutos(d: number) {
    this._duracaoMinutos = d;
  }
  public get ativo(): boolean {
    return this._ativo;
  }
  public set ativo(ativo: boolean) {
    this._ativo = ativo;
  }
  public get sessoes(): SessaoFilme[] {
    return this._sessoes;
  }
  public set sessoes(sessoes: SessaoFilme[]) {
    this._sessoes = sessoes;
  }
}
