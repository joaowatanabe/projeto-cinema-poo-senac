export interface ICrud<T> {
  adicionar(item: T): string;
  listar(): string;
  excluir(id: number): string;
  buscarPorId(id: number): T | undefined;
}
