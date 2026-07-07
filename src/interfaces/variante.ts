import { IColor } from "./color";
import { ITalla } from "./talla";

export interface IVariante {
  _id: string;
  nombre: string;
  color: IColor;
  talla: ITalla;
  precio: number;
  cantidad: number;
}