export class ClienteCinema {
  private _id: number;
  private _nome: string;
  private _cpf: string;
  private _idade: number;
  private _ativo: boolean;
  private _estudante: boolean;

  constructor(id: number, cpf: string) {
    this._id = id;
    this._nome = "";
    this._cpf = cpf;
    this._idade = 0;
    this._ativo = true;
    this._estudante = false;
  }

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

  public get ativo(): boolean {
    return this._ativo;
  }

  public set ativo(ativo: boolean) {
    this._ativo = ativo;
  }

  public get estudante(): boolean {
    return this._estudante;
  }

  public set estudante(estudante: boolean) {
    this._estudante = estudante;
  }
}