import { IColor } from "./color";
import { IProducto } from "./producto";
import { ITalla } from "./talla";

export interface IVariante {
  _id: string;
  producto: IProducto;
  color: IColor;
  talla: ITalla;
  precio: number;
  cantidad: number;
}