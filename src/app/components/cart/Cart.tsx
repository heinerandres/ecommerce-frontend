import { useEffect, useState } from "react";

import { IProducto } from '@/src/interfaces/producto';
import CantidadesCarrito from "./CantidadesCarrito";
import { currencyFormat } from "@/src/utilities/currencyFormat";
import { useDispatch } from "react-redux";
import { updateCantidad } from "@/src/redux/slices/carritoSlice";
import { IVariante } from "@/src/interfaces/variante";
import { aumentarCantidad } from "@/src/services/api/server/carritos";
import { _base } from "@/src/utilities/url-imgBase";

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
  const base = _base;
  return (
    <div className="shadow-md border border-gray-300 my-3 rounded-xl">
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="flex p-3" key={productoEnCarrito.producto._id}>
        <div className="w-40 2xl:w-50 border">
          <img 
            src={ base + productoEnCarrito.producto.imagenes?.[0].url }
            className="h-full w-full"
          />
        </div>
        <div className="relative flex flex-col justify-between p-0 pl-6 w-full">
          <div className="flex justify-between">
            <p className="font-bold">{ productoEnCarrito.producto.nombre }</p>
            <p onClick={() => handleRemover(productoEnCarrito.producto._id, productoEnCarrito.variante?._id)} className="cursor-pointer text-xs hover:underline">Remover</p>
          </div>
          {
            productoEnCarrito.variante ? (
              <>
                <p className="font-bold text-base">{ currencyFormat(productoEnCarrito.variante.precio ?? 0) }</p>
                <div className="flex gap-2 text-sm">
                  <div className="bg-gray-100 p-2 rounded-lg flex items-center">
                    <div className="border w-4 h-4 rounded-full mr-2" style={{backgroundColor: productoEnCarrito.variante.color.valor}}></div>
                    <span className="font-semibold mr-1">Color: </span>{ productoEnCarrito.variante.color.nombre }
                  </div>
                  <p className="bg-gray-100 p-2 rounded-lg"><span className="font-semibold">Talla: </span>{ productoEnCarrito.variante.talla.valor }</p> 
                </div>
              </>
            ) : (
              <p className="font-bold text-base">{ currencyFormat(productoEnCarrito.producto.precio ?? 0) }</p>
            )
          }
          <div className="flex flex-row justify-between pt-3">
            <p className=" shrink-0 h-fit p-1 px-3 rounded-lg xl:text-sm 2xl:text-base text-green-400 bg-green-100"><i className="fa-solid fa-check mr-2"></i>Disponibles</p>
            <div className="flex gap-10 items-center self-end">
              <CantidadesCarrito 
                productoId={productoEnCarrito.producto._id}
                cantidadEnCarrito={ cantidadEnCarrito }
                stock={productoEnCarrito.stock}
                precio={!productoEnCarrito.variante ? productoEnCarrito.producto.precio ?? 0 : productoEnCarrito.variante.precio ?? 0}
                _actualizarCantidad={_actualizarCantidad}
                actualizarCantidad={actualizarCantidad}
              />
            <div>
              <p className="text-sm">Subtotal</p>
            <p className="font-semibold">{ currencyFormat(productoEnCarrito.producto.precio ? productoEnCarrito.producto.precio * productoEnCarrito.cantidadCarrito : (productoEnCarrito.variante?.precio ?? 0) * productoEnCarrito.cantidadCarrito)}</p>
            </div>
            </div>
            

          </div>
          
        </div>
      </div>
    </div>
    
  )
}