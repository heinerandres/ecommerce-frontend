'use client';

import { IProducto } from "@/src/interfaces/producto";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/src/redux/store';
import { updateCantidad } from '@/src/redux/slices/carritoSlice';



type Props = {
  productoId: string,
  cantidadEnCarrito: number,
  stock: number,
  _actualizarCantidad: ( productoId: string, nuevaCantidad: number ) => void,
  precio: number,
  actualizarCantidad: (cantidad: number) => void; 
}

export default function CantidadesCarrito({ productoId, cantidadEnCarrito, stock, precio, _actualizarCantidad, actualizarCantidad}: Props) {

  return (
    <div className="">
      <h3 className="font-bold">Cantidad</h3>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => {
            if(cantidadEnCarrito > 1){
              _actualizarCantidad(productoId, (cantidadEnCarrito - 1));
              actualizarCantidad(cantidadEnCarrito - 1);
            }
          }}
          className="rounded-full cursor-pointer"
        >
          <i className="text-base 2xl:text-xl fa-regular fa-circle-left"></i>
        </button>

        <span className="w-8 text-center">{cantidadEnCarrito}</span>

        <button 
          onClick={ () => {
            if(cantidadEnCarrito < stock) {
              _actualizarCantidad(productoId, (cantidadEnCarrito + 1));
              actualizarCantidad(cantidadEnCarrito + 1); 
            }
          }}
          className="rounded-full cursor-pointer"
        >
          <i className="text-base 2xl:text-xl fa-regular fa-circle-right"></i>
        </button>
      </div>
      
    </div>
  );
}