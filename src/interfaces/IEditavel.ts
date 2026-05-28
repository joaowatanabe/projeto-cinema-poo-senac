export interface IEditavel<T> {
  editar(id: number, dados: Partial<T>): string;
}