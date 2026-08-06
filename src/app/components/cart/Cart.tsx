import { useEffect, useState } from "react";

import { IProducto } from '@/src/interfaces/producto';
import CantidadesCarrito from "./CantidadesCarrito";
import { currencyFormat } from "@/src/utilities/currencyFormat";
import { useDispatch } from "react-redux";
import { updateCantidad } from "@/src/redux/slices/carritoSlice";
import { IVariante } from "@/src/interfaces/variante";
import { aumentarCantidad } from "@/src/services/api/server/carritos";

type Props = {
  productoEnCarrito: { cantidadCarrito: number, producto: IProducto, variante?: IVariante, stock:number}
  _actualizarCantidad: ( productoId: string, nuevaCantidad: number ) => void,
  usuario: string,
  handleRemover: (productoId: string, varianteId: string | undefined) => Promise<void>;
}

//actualizarCantidad -> del carro
//producto -> de la base de datos
//cantidad -> del carrito

export default function Cart({ productoEnCarrito, usuario, _actualizarCantidad, handleRemover }:Props) {
  const dispatch = useDispatch();

  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(productoEnCarrito.cantidadCarrito);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const actualizarCantidad = async (nuevaCantidad: number) => {
    const respuestaCantidad = await aumentarCantidad({usuarioId: usuario, productoId: productoEnCarrito.producto._id, cantidad: nuevaCantidad})
    if(respuestaCantidad.ok) {
      setCantidadEnCarrito(nuevaCantidad);
      dispatch(updateCantidad({
          _id: productoEnCarrito.producto._id,
          nuevaCantidad
      }));
    }
    else setErrorMsg(JSON.stringify(respuestaCantidad));
  };
  const base = "http://localhost:4000/uploads/";
  console.log(productoEnCarrito);
  return (
    <>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="flex h-[25%] p-3" key={productoEnCarrito.producto._id}>
        <div className="w-30 2xl:w-50 border">
          <img 
            src={ base + productoEnCarrito.producto.imagenes?.[0].url }
            className="h-full w-full"
          />
        </div>
        <div className="p-0 pl-6 w-full">
          <div className="flex justify-between">
            <p className="font-bold">{ productoEnCarrito.producto.nombre }</p>
            <p onClick={() => handleRemover(productoEnCarrito.producto._id, productoEnCarrito.variante?._id)} className="underline cursor-pointer">Remover</p>
          </div>
          {
            productoEnCarrito.variante ? (
              <>
                <p>{ currencyFormat(productoEnCarrito.variante.precio ?? 0) }</p>
                <p>{ productoEnCarrito.variante.talla.valor }</p> 
                <p>{ productoEnCarrito.variante.color.nombre }</p>
              </>
            ) : (
              <p>{ currencyFormat(productoEnCarrito.producto.precio ?? 0) }</p>
            )
          }
          <CantidadesCarrito 
            productoId={productoEnCarrito.producto._id}
            cantidadEnCarrito={ cantidadEnCarrito }
            stock={productoEnCarrito.stock}
            precio={!productoEnCarrito.variante ? productoEnCarrito.producto.precio ?? 0 : productoEnCarrito.variante.precio ?? 0}
            _actualizarCantidad={_actualizarCantidad}
            actualizarCantidad={actualizarCantidad}
          />
        </div>
      </div>
    </>
    
  )
}