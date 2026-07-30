import { IDireccion } from "./direccion";
import { IProductoPedido } from "./productoPedido";


export interface IPedidoNuevo {
  _id: string;
  usuario_id: string;
  direccion_id?: IDireccion;
  tipoPedido: string;
  estaPago: boolean;
  estado: string;
  total: number;
  productos: IProductoPedido[];
  fecha?: Date;
}