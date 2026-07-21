'use client';

import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { useEffect, useState } from "react";
import { editarProducto, editarProductoConImagenes } from "@/src/services/api/server/productos";
import { useRouter } from "next/navigation";

type Props = {
    producto: IProducto | null;
}

export default function FormProductoIndividual({producto}:Props) {
    const [precio, setPrecio] = useState(producto?.precio ?? '');
    const [cantidad, setCantidad] = useState(producto?.cantidad ?? '');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();
        
        const productoNuevo = {
            _id: producto?._id,
            nombre: producto?.nombre,
            slug: producto?.slug,
            descripcion: producto?.descripcion,
            categoria: producto?.categoria._id,
            precio: String(precio),
            cantidad: String(cantidad),
        }
        const respuestaEditar = await editarProducto(productoNuevo);
        if (respuestaEditar.ok) router.push('/admin/productos');
        else setErrorMsg(respuestaEditar); 
    }

    return (
        <>
            <div className="w-[80vw] min-h-[82vh] pt-0 ml-10 border-gray-100 shadow-lg rounded-2xl border">
                <div className="">
                    <div className="flex justify-between mt-10 h-15">
                        <div className="flex ml-20 items-center">
                            <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
                            <i className="fa-solid fa-gift text-xl text-blue-700"></i>
                            </div>
                            <div className="ml-4">
                            <h5 className="text-2xl font-medium">Producto Sin variantes</h5>
                            <h3 className="text-gray-400">Gestiona las imágenes del producto.</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-10">
                    <div className="self-start w-[23%] p-10 mt-5 ml-25 border border-gray-300 rounded-2xl shadow-md">
                        <h1 className=" text-2xl mb-8 font-semibold">Información del Producto</h1>
                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="nombre">Nombre</label>
                            <input
                                minLength={2}
                                disabled
                                className="py-2 bg-white rounded mb-5  disabled:cursor-default"
                                type="text" 
                                placeholder="Nombre"
                                name="nombre"
                                value={producto?.nombre}
                                
                            />
                            <div className="flex w-full">
                                <div className="flex flex-col flex-1">
                                    <label className="font-bold" htmlFor="slug">Slug</label>
                                    <input
                                        minLength={2}
                                        disabled
                                        className="py-2 bg-white rounded mb-5  disabled:cursor-default"
                                        type="text" 
                                        placeholder="Slug"
                                        name="slug"
                                        value={producto?.slug}
                                        
                                    />
                                </div>
                            </div>
                            <label className="font-bold" htmlFor="descripcion">Descripción</label>
                            <textarea
                                minLength={2}
                                disabled
                                className="py-2 bg-white rounded disabled:cursor-default"
                                placeholder="Descripción"
                                name="descripcion"
                                value={producto?.descripcion}
                            />
                            <label className="font-bold" htmlFor="categoria">Categoria</label>
                            <input
                                value={producto?.categoria.nombre}
                                disabled
                                type="text"
                                className="py-2 mb-2"
                            />
                        </div>
                    </div>
                    <form onSubmit={handleEditar} className="mt-0 w-[25vw] ml-35 p-10 border border-gray-300 rounded-xl shadow-md">
                        <h1 className=" text-2xl mb-3 font-semibold">Información adicional para el producto sin variantes</h1>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="precio">Precio</label>
                            <input
                                minLength={2}
                                className="px-5 py-2 bg-white border rounded mb-3"
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
                                className="px-5 py-2 bg-white border rounded"
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
                        <div className="w-full flex justify-around mt-8">
                            <Link href="/admin/productos" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                            <button
                                type="submit"
                                className="bg-blue-600 py-2 rounded text-white cursor-pointer w-[45%]">
                                <i className="fa-regular fa-floppy-disk mr-3"></i>
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}