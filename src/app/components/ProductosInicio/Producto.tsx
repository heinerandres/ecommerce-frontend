'use client';
import { IProducto } from "@/src/interfaces/producto";
import { _base } from "@/src/utilities/url-imgBase";
import Link from "next/link";
import { useState } from "react";

type Props = {
    producto: IProducto;
    imgs: {_id: string, producto: string, url: string}[];
}

export const Producto = ({ producto, imgs }: Props) => {
    const [hover, setHover] = useState(false);
    const base = _base;
  return (
    <Link 
        href = {`./${producto.slug}`}
        key={producto._id}
        className="relative flex flex-col h-45 xl:h-70 2xl:h-100 items-center bg-white p-4 shadow-lg cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
        <h2 className="absolute font-bold lg:my-0 my-[3%] text-center">{ producto.nombre }</h2>

        <img 
            src={ base + imgs[0].url }
            alt={producto.nombre}
            className="absolute top-[15%] w-[80%] xl:w-[80%] 2xl:w-[90%] h-[65%] xl:h-[65%] 2xl:h-[80%] mt-3 shadow-lg rounded-xl"
            style={{
                transition: "opacity 0.5s ease",
                opacity: hover ? 0 : 1,
            }}
        />
        <img 
            src={ base + imgs[1].url }
            alt={producto.nombre}
            className="absolute top-[15%] w-[80%] xl:w-[80%] 2xl:w-[90%] h-[65%] xl:h-[65%] 2xl:h-[80%] mt-3 shadow-lg rounded-xl"
            style={{
                transition: "opacity 2s ease",
                opacity: hover ? 1 : 0,
            }}
        />
    </Link>
  )
}