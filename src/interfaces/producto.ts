export interface IProducto {
  _id: string;
  nombre: string;
  slug: string;
  categoria: string;
  descripcion: string;
  precio?: number;
  cantidad?: number;
}