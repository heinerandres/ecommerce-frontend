'use client';

import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";

type Props = {
    producto: IProducto | null;
    categorias: {_id: string, nombre:string}[] | null;
}

export default function FormDetallesProducto({producto, categorias}:Props) {


    return (
        <>
            <h1 className=" text-4xl mb-5" >Información del Producto</h1>
            <div className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
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
                        <label htmlFor="slug">Slug</label>
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
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    minLength={2}
                    disabled
                    className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                    placeholder="Descripción"
                    name="descripcion"
                    value={producto?.descripcion}
                />
                <label htmlFor="categoria">Categoria</label>
                <input
                    value={categorias?.find(c => c._id === producto?.categoria)?.nombre}
                    disabled
                    type="text"
                    className="border rounded p-2  mb-2 disabled:bg-gray-100 disabled:cursor-default"
                />
                
                <div className="w-full flex justify-around mt-10">
                    <Link href="/admin/productos" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                </div>
            </div>
        </>
    )
}