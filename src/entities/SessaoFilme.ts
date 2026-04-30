import { Filme } from "./Filme";

export class SessaoFilme {
  private _id: number;
  private _filme: Filme;
  private _horario: string;
  private _sala: string;
  private _totalAssentos: number;
  private _assentosOcupados: number[];
  constructor(
    id: number,
    filme: Filme,
    horario: string,
    sala: string,
    totalAssentos: number,
  ) {
    this._id = id;
    this._filme = filme;
    this._horario = horario;
    this._sala = sala;
    this._totalAssentos = totalAssentos;
    this._assentosOcupados = [];
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get filme(): Filme {
    return this._filme;
  }

  public set filme(filme: Filme) {
    this._filme = filme;
  }

  public get horario(): string {
    return this._horario;
  }

  public set horario(horario: string) {
    this._horario = horario;
  }

  public get sala(): string {
    return this._sala;
  }

  public set sala(sala: string) {
    this._sala = sala;
  }

  public get totalAssentos(): number {
    return this._totalAssentos;
  }

  public set totalAssentos(totalAssentos: number) {
    this._totalAssentos = totalAssentos;
  }

  public get assentosOcupados(): number[] {
    return this._assentosOcupados;
  }

  public set assentosOcupados(assentosOcupados: number[]) {
    this._assentosOcupados = assentosOcupados;
  }

  public assentoDisponivel(numero: number): boolean {
    return (
      numero >= 1 &&
      numero <= this.totalAssentos &&
      !this.assentosOcupados.includes(numero)
    );
  }

  public ocuparAssento(numero: number): boolean {
    if (!this.assentoDisponivel(numero)) return false;
    this.assentosOcupados.push(numero);
    return true;
  }
}
