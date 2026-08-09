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
    <div className="items-center">
      <h3 className="text-sm">Cantidad</h3>
      <div className="flex items-center">
        <button 
          onClick={() => {
            if(cantidadEnCarrito > 1){
              _actualizarCantidad(productoId, (cantidadEnCarrito - 1));
              actualizarCantidad(cantidadEnCarrito - 1);
            }
          }}
          className="rounded-l-sm px-2 xl:py-1 2xl:py-0 cursor-pointer border border-gray-300"
        >
          <i className="text-sm 2xl:text-sm fa-solid fa-minus"></i>
        </button>

        <span className="w-12 text-center xl:py-1 2xl:py-0 border-y border-gray-300">{cantidadEnCarrito}</span>

        <button 
          onClick={ () => {
            if(cantidadEnCarrito < stock) {
              _actualizarCantidad(productoId, (cantidadEnCarrito + 1));
              actualizarCantidad(cantidadEnCarrito + 1); 
            }
          }}
          className="rounded-r-sm px-2 xl:py-1 2xl:py-0 cursor-pointer border border-gray-300"
        >
          <i className="text-sm 2xl:text-sm fa-solid fa-plus"></i>
        </button>
      </div>
      
    </div>
  );
}