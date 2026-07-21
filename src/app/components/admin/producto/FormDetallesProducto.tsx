'use client';

import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";

type Props = {
    producto: IProducto | null;
}

export default function FormDetallesProducto({producto}:Props) {


    return (
        <>
            <div className="flex flex-col border border-gray-200 shadow-lg p-10 rounded-2xl">
                <h1 className=" text-4xl mb-5 font-semibold">Información del Producto</h1>
                <label htmlFor="nombre" className="mb-2">Nombre</label>
                <input
                    minLength={2}
                    disabled
                    className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={producto?.nombre}
                    
                />
                <div className="flex w-full">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="slug" className="mb-2">Slug</label>
                        <input
                            minLength={2}
                            disabled
                            className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                            type="text" 
                            placeholder="Slug"
                            name="slug"
                            value={producto?.slug}
                            
                        />
                    </div>
                </div>
                <label htmlFor="descripcion" className="mb-2">Descripción</label>
                <textarea
                    minLength={2}
                    disabled
                    className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                    placeholder="Descripción"
                    name="descripcion"
                    value={producto?.descripcion}
                />
                <label htmlFor="categoria" className="mb-2">Categoria</label>
                <input
                    value={producto?.categoria.nombre}
                    disabled
                    type="text"
                    className="border rounded p-2  mb-3 disabled:bg-gray-100 disabled:cursor-default"
                />
                <p className="text-xs text-gray-500">Más información sobre el producto seleccionado.</p>
                <div className="w-full flex justify-around mt-10">
                    <Link href="/admin/productos" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                </div>
            </div>
        </>
    )
}