'use client';

import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { useEffect, useState } from "react";
import { editarProductoConImagenes } from "@/src/services/api/server/productos";
import { useRouter } from "next/navigation";

type Props = {
    producto: IProducto | null;
    categorias: {_id: string, nombre: string}[] | null;
}

export default function FormProductoIndividual({producto, categorias}:Props) {
    const [precio, setPrecio] = useState(producto?.precio ?? '');
    const [cantidad, setCantidad] = useState(producto?.cantidad ?? '');
    const [errorMsg, setErrorMsg] = useState('');

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("_id", producto?._id!);
        formData.append("nombre", producto?.nombre!);
        formData.append("slug", producto?.slug!);
        formData.append("descripcion", producto?.descripcion!);
        formData.append("categoria", producto?.categoria!);
        formData.append("precio", String(precio));
        formData.append("cantidad", String(cantidad));
        
        /* const respuestaEditar = await editarProductoConImagenes(formData);
        if (respuestaEditar.ok) {
          router.push('/admin/productos');
        } else {
          setErrorMsg(respuestaEditar.msg);
        } */
    }

    return (
        <>
            <h1 className=" text-4xl mb-5" >Información del Producto</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
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
                <hr className="my-4 border-gray-300" />
                <h1 className=" text-2xl mb-5" >Información adicional para el producto sin variantes</h1>
                <div className="flex flex-col flex-1">
                    <label htmlFor="precio">Precio</label>
                    <input
                        minLength={2}
                        required
                        className="px-5 py-2 bg-white border rounded mb-5"
                        type="number" 
                        placeholder="Precio"
                        name="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="precio">Cantidad</label>
                    <input
                        minLength={2}
                        required
                        className="px-5 py-2 bg-white border rounded mb-5"
                        type="number" 
                        placeholder="Cantidad"
                        name="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                </div>
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-around mt-10">
                    <Link href="/admin/productos" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                    <button
                        type="submit"
                        className="bg-blue-600 py-2 rounded text-white cursor-pointer w-[45%]">
                        Agregar
                    </button>
                </div>
            </form>
        </>
    )
}