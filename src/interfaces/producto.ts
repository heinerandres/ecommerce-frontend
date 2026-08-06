import { ICategoria } from "./categoria";
import { IImagenes } from "./imagenes";
import { IVariante } from "./variante";

export interface IProducto {
  _id: string;
  nombre: string;
  slug: string;
  categoria: ICategoria;
  descripcion: string;
  precio?: number;
  cantidad?: number;
  variantes?: IVariante[];
  imagenes?: IImagenes [];
}