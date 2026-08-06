import { IProducto } from "./producto";
import { IVariante } from "./variante";


export interface IProductoPedido {
    id: IProducto;
    variante: IVariante | null;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}