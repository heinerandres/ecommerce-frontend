'use client';
import { IProducto } from "@/src/interfaces/producto";
import { _base } from "@/src/utilities/url-imgBase";
import Link from "next/link";
import { useState } from "react";
import { currencyFormat } from '../../../utilities/currencyFormat';

type Props = {
    producto: IProducto;
    imgs: {_id: string, producto: string, url: string}[];
}

export const Producto = ({ producto, imgs }: Props) => {
    const [hover, setHover] = useState(false);
    const base = _base;
  return (
    <div 
        key={producto._id}
        className="relative flex flex-col h-45 xl:h-70 2xl:h-95 items-center bg-white shadow-lg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >

        <img 
            src={ base + imgs[0].url }
            alt={producto.nombre}
            className="absolute w-full h-[65%] xl:h-[65%] 2xl:h-[75%] shadow-lg rounded-xl"
            style={{
                transition: "opacity 0.5s ease",
                opacity: hover ? 0 : 1,
            }}
        />
        <img 
            src={ base + imgs[1].url }
            alt={producto.nombre}
            className="absolute w-full h-[65%] xl:h-[65%] 2xl:h-[75%] shadow-lg rounded-xl"
            style={{
                transition: "opacity 2s ease",
                opacity: hover ? 1 : 0,
            }}
        />
        <div className="absolute bottom-2 font-bold lg:my-0 my-[3%] px-5 text-sm w-full">
            <h2 className="">{ producto.nombre }</h2>
            <div className="flex  justify-between">
                <h2 className="">{currencyFormat(producto.precio ? producto.precio : producto.variantes?.[0].precio ?? 0)}</h2>
                <div className="flex items-center">
                    <i className="fa-solid fa-star mr-1 text-yellow-300"></i>
                    <p>5.0</p>
                </div>
            </div>
            
            <div className="flex justify-center w-full">
                <Link 
                    href = {`./${producto.slug}`}
                    key={producto._id}
                    className="text-center border border-gray-400 font-light block w-full p-1 rounded-md"
                    >
                        Agregar al carrito
                </Link>
            </div>
        </div>
        
        
    </div>
  )
}