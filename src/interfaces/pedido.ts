import { IDireccion } from "./direccion";
import { IProducto } from "./producto";


export interface IPedido {
  _id: string;
  usuario_id: string;
  direccion_id: IDireccion;
  tipoPedido: string;
  estaPago: boolean;
  estado: string;
  total: number;
  productos: IProducto[];
  fecha: Date;
}