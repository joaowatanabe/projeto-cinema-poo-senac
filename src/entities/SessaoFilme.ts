import { Filme } from "./Filme";

export class SessaoFilme {
  id: number;
  filme: Filme;
  horario: string;
  sala: string;
  totalAssentos: number;
  assentosOcupados: number[];

  constructor(
    id: number,
    filme: Filme,
    horario: string,
    sala: string,
    totalAssentos: number,
  ) {
    this.id = id;
    this.filme = filme;
    this.horario = horario;
    this.sala = sala;
    this.totalAssentos = totalAssentos;
    this.assentosOcupados = [];
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
