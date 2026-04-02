import { SessaoFilme } from "./SessaoFilme";

export class Filme {
  id: number;
  titulo: string;
  classificacao: number;
  duracaoMinutos: number;
  sinopse: string;
  ativo: boolean;
  sessoes: SessaoFilme[];

  constructor(id: number, titulo: string) {
    this.id = id; 
    this.titulo = titulo; 
    this.classificacao = 0;
    this.duracaoMinutos = 0;
    this.sinopse = "";
    this.ativo = true;
    this.sessoes = [];
  }
}