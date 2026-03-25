import { Cinema } from "./src/entities/Cinema";
import { MenuCinema } from "./src/ui/MenuCinema";

const cinema = new Cinema("Cine SENAC");
const menu = new MenuCinema(cinema);

menu.iniciar();
