import { MenuCinema } from "./src/ui/MenuCinema";
import { ClienteComum } from "./src/entities/ClienteComum";
import { ClienteVip } from "./src/entities/ClienteVip";
import { ClienteCinema } from "./src/entities/ClienteCinema";
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

const filmeComum1 = new FilmeComum(1, "O Poderoso Chefão");
filmeComum1.classificacao = 14;
filmeComum1.duracaoMinutos = 175;

const filmeAdulto1 = new FilmeAdulto(2, "Clube da Luta");
filmeAdulto1.duracaoMinutos = 139;

const filmeComum2 = new FilmeComum(3, "Toy Story");
filmeComum2.classificacao = 0;
filmeComum2.duracaoMinutos = 81;

const filmeAdulto2 = new FilmeAdulto(4, "Pulp Fiction");
filmeAdulto2.duracaoMinutos = 154;

const filmes: Filme[] = [filmeComum1, filmeAdulto1, filmeComum2, filmeAdulto2];

console.log("\n====== RELATÓRIO DE FILMES ======");
filmes.forEach((f) => console.log(f.descricao()));

const menu = new MenuCinema(clientes, filmes);
menu.iniciar();
