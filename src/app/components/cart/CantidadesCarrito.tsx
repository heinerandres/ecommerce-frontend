'use client';

import { IProducto } from "@/src/interfaces/producto";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/src/redux/store';
import { updateCantidad } from '@/src/redux/slices/carritoSlice';



type Props = {
  producto: IProducto,
  stock: number,
  setSubtotal: React.Dispatch<React.SetStateAction<number>>,
  precio: number,
}

export default function CantidadesCarrito({producto, setSubtotal, precio, stock}: Props) {
  const carritoCompleto = useSelector((state: RootState) => state.carrito);
  const carrito = carritoCompleto.carrito;
  const cartProducts = carritoCompleto.productos;

  const dispatch = useDispatch();

const actualizarCantidad = (_id:string, nuevaCantidad: number) => {
  dispatch(updateCantidad({_id, nuevaCantidad}));
}; 
const productoCarrito = carrito.productos.find(_producto => _producto._id === producto._id)!;
console.log("CantidadesCarrito");
console.log(producto);
console.log("productos en el carro");
console.log(carrito.productos);


  return (
    <div className="">
      <h3 className="font-bold ">Cantidad</h3>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => {
            if(productoCarrito.cantidad > 1){
              actualizarCantidad(producto._id, productoCarrito.cantidad - 1);
              setSubtotal(v => v - precio);
            }
            
          }}
          className="rounded-full cursor-pointer"
        >
          <i className="text-xl fa-regular fa-circle-left"></i>
        </button>

        <span className="w-8 text-center">{productoCarrito.cantidad}</span>

        <button 
          onClick={ () => {
            if(productoCarrito.cantidad < stock) {
              actualizarCantidad(producto._id, productoCarrito!.cantidad+ 1);
              setSubtotal(v => v + precio);
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