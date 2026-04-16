export class SalaCinema {
  private static readonly COLUNAS = 6;
  private static readonly LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  public static numeroParaLabel(numero: number): string {
    const col = ((numero - 1) % SalaCinema.COLUNAS) + 1;
    const fileira = Math.floor((numero - 1) / SalaCinema.COLUNAS);
    return `${SalaCinema.LETRAS[fileira]}${col}`;
  }

  public static labelParaNumero(label: string): number {
    const letra = label[0].toUpperCase();
    const col = parseInt(label.slice(1));
    const fileira = SalaCinema.LETRAS.indexOf(letra);
    if (fileira === -1 || isNaN(col)) return -1;
    return fileira * SalaCinema.COLUNAS + col;
  }

  public static renderizar(
    totalAssentos: number,
    ocupados: number[],
    selecionado?: number,
  ): void {
    const totalFileiras = Math.ceil(totalAssentos / SalaCinema.COLUNAS);
    const largura = SalaCinema.COLUNAS * 5 + 4;

    console.log("\n" + " ".repeat(6) + "╔" + "═".repeat(largura) + "╗");
    console.log(
      " ".repeat(6) +
        "║" +
        " ".repeat(Math.floor((largura - 6) / 2)) +
        " TELA " +
        " ".repeat(Math.ceil((largura - 6) / 2)) +
        "║",
    );
    console.log(" ".repeat(6) + "╚" + "═".repeat(largura) + "╝");
    console.log();

    let header = "      ";
    for (let c = 1; c <= SalaCinema.COLUNAS; c++) {
      header += `  ${c}  `;
    }
    console.log(header);
    console.log("      " + "─────".repeat(SalaCinema.COLUNAS));

    for (let f = 0; f < totalFileiras; f++) {
      const letra = SalaCinema.LETRAS[f];
      let linha = ` ${letra}  │`;

      for (let c = 1; c <= SalaCinema.COLUNAS; c++) {
        const numero = f * SalaCinema.COLUNAS + c;

        if (numero > totalAssentos) {
          linha += "     ";
          continue;
        }

        if (numero === selecionado) {
          linha += " [★] ";
        } else if (ocupados.includes(numero)) {
          linha += " [✖] ";
        } else {
          linha += " [ ] ";
        }
      }

      linha += `│  ${letra}`;
      console.log(linha);
    }

    console.log("      " + "─────".repeat(SalaCinema.COLUNAS));

    console.log();
    console.log("  Legenda:  [ ] Livre    [✖] Ocupado    [★] Selecionado");
    console.log(
      `  Livres: ${totalAssentos - ocupados.length}/${totalAssentos}\n`,
    );
  }
}
