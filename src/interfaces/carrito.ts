import { IProducto } from "./producto";

export interface ICarrito {
    _id: null,
    usuario_id: null,
    productos: { _id: string; cantidad: number; }[],
}