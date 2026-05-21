export abstract class ClienteCinema {
  protected _id: number;
  protected _nome: string;
  protected _cpf: string;
  protected _idade: number;
  protected _ativoVip: boolean;
  protected _estudante: boolean;

  constructor(id: number, cpf: string) {
    this._id = id;
    this._nome = "";
    this._cpf = cpf;
    this._idade = 0;
    this._ativoVip = false;
    this._estudante = false;
  }

  public abstract descricao(): string;

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }
  public get nome(): string {
    return this._nome;
  }
  public set nome(nome: string) {
    this._nome = nome;
  }
  public get cpf(): string {
    return this._cpf;
  }
  public get idade(): number {
    return this._idade;
  }
  public set idade(idade: number) {
    this._idade = idade;
  }
  public get ativoVip(): boolean {
    return this._ativoVip;
  }
  public set ativoVip(ativoVip: boolean) {
    this._ativoVip = ativoVip;
  }
  public get estudante(): boolean {
    return this._estudante;
  }
  public set estudante(estudante: boolean) {
    this._estudante = estudante;
  }
}
