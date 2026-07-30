import { ICarrito } from "./carrito";


export interface IDireccion {
  _id: string;
  carrito: ICarrito;
  nombres: string;
  apellidos: string;
  direccion: string;
  codigoPostal: Number;
  ciudad: string;
  pais: string;
  telefono: string;
}