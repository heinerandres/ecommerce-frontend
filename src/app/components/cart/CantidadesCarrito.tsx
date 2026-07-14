'use client';

import { IProducto } from "@/src/interfaces/producto";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/src/redux/store';
import { updateCantidad } from '@/src/redux/slices/carritoSlice';



type Props = {
  cantidadEnCarrito: number,
  stock: number,
  setSubtotal: React.Dispatch<React.SetStateAction<number>>,
  precio: number,
  actualizarCantidad: (cantidad: number) => void; 
}

export default function CantidadesCarrito({cantidadEnCarrito, stock, precio, setSubtotal, actualizarCantidad}: Props) {

  return (
    <div className="">
      <h3 className="font-bold ">Cantidad</h3>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => {
            if(cantidadEnCarrito > 1){
              setSubtotal(v => v - precio);
              actualizarCantidad(cantidadEnCarrito - 1);
            }
          }}
          className="rounded-full cursor-pointer"
        >
          <i className="text-xl fa-regular fa-circle-left"></i>
        </button>

        <span className="w-8 text-center">{cantidadEnCarrito}</span>

        <button 
          onClick={ () => {
            if(cantidadEnCarrito < stock) {
              setSubtotal(v => v + precio);
              actualizarCantidad(cantidadEnCarrito + 1); 
            }
          }}
          className="rounded-full cursor-pointer"
        >
          <i className="text-xl fa-regular fa-circle-right"></i>
        </button>
      </div>
      
    </div>
  );
}