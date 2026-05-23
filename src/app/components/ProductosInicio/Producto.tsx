'use client';
import Link from "next/link";
import { useState } from "react";

interface Producto {
  _id: string;
  nombre: string;
  slug: string;
  categoria: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  descripcion: string;
  talla: string;
  color: string;
  precio: number;
  cantidad: number;
}

type Props = {
    producto: Producto;
}

export const Producto = ({ producto }: Props) => {
    const [hover, setHover] = useState(false);
  return (
    <Link 
        href = {`./${producto.slug}`}
        key={producto._id}
        className="relative flex flex-col items-center bg-white p-4 shadow-lg cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
        <h2 className="absolute text-xl font-bold my-[3%] text-center">{ producto.nombre }</h2>

        <img 
            src={ `${producto.img1}`  }
            alt={producto.nombre}
            className="absolute top-[15%] w-[90%] h-[80%] shadow-lg rounded-xl"
            style={{
                transition: "opacity 0.5s ease",
                opacity: hover ? 0 : 1,
            }}
        />
        <img 
            src={ `${producto.img2}`  }
            alt={producto.nombre}
            className="absolute top-[15%] w-[90%] h-[80%] shadow-lg rounded-xl"
            style={{
                transition: "opacity 2s ease",
                opacity: hover ? 1 : 0,
            }}
        />
    </Link>
  )
}