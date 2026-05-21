import { MenuCinema } from "./src/ui/MenuCinema";
import { ClienteCinema } from "./src/entities/ClienteCinema";
import { ClienteComum } from "./src/entities/ClienteComum";
import { ClienteVip } from "./src/entities/ClienteVip";
import { Filme } from "./src/entities/Filme";
import { FilmeComum } from "./src/entities/FilmeComum";
import { FilmeAdulto } from "./src/entities/FilmeAdulto";

const clientes: ClienteCinema[] = [
  Object.assign(new ClienteComum(1, "111.111.111-11"), {
    _nome: "João",
    _idade: 25,
    _estudante: true,
  }),
  Object.assign(new ClienteVip(2, "222.222.222-22", true, false), {
    _nome: "Maria",
    _idade: 30,
  }),
  Object.assign(new ClienteComum(3, "333.333.333-33"), {
    _nome: "Pedro",
    _idade: 16,
  }),
  Object.assign(new ClienteVip(4, "444.444.444-44", false, true), {
    _nome: "Ana",
    _idade: 22,
  }),
];

console.log("\n====== RELATÓRIO DE CLIENTES ======");
clientes.forEach((c) => console.log(c.descricao()));

const filmes: Filme[] = [
  new FilmeComum(1, "O Poderoso Chefão"),
  new FilmeAdulto(2, "Clube da Luta"),
  new FilmeComum(3, "Toy Story"),
  new FilmeAdulto(4, "Pulp Fiction"),
];

(filmes[0] as FilmeComum).classificacao = 14;
(filmes[2] as FilmeComum).classificacao = 0;

console.log("\n====== RELATÓRIO DE FILMES ======");
filmes.forEach((f) => console.log(f.descricao()));

const menu = new MenuCinema();
menu.iniciar();
