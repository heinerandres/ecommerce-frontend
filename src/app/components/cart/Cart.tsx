import { useEffect, useState } from "react";

import { IProducto } from '@/src/interfaces/producto';
import CantidadesCarrito from "./CantidadesCarrito";
import { currencyFormat } from "@/src/utilities/currencyFormat";
import { ICarrito } from "@/src/interfaces/carrito";

type Props = {
    producto: IProducto,
    tallas: {_id: string, valor:string}[] | null,
    colores: {_id: string,nombre:string, valor:string}[] | null,
    setSubtotal: React.Dispatch<React.SetStateAction<number>>,
}

//actualizarCantidad -> del carro
//producto -> de la base de datos
//cantidad -> del carrito

export default function Cart({ producto,  setSubtotal, tallas, colores }:Props) {
  const talla = tallas?.find(talla => talla._id === producto.talla);
  const color = colores?.find(color => color._id === producto.color);
  return (
    <div className="flex h-[25%] p-3" key={producto._id}>
        <img 
          src={ producto.img1 }
          className="h-full"
        />
        <div className="p-2 pl-6 w-full">
          <p className="font-bold">{ producto.nombre }</p>
          <p>{ currencyFormat(producto.precio) }</p>
          <p>{ color?.nombre }</p>
          <p>{ talla?.valor }</p> 

          <CantidadesCarrito 
          producto={producto}
          setSubtotal={setSubtotal} 
          precio={producto.precio} 
          stock={producto.cantidad}/> 
          <p className="underline cursor-pointer">Remove</p>
        </div>
    </div>
  )
}