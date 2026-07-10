'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { editarProducto } from "@/src/services/api/server/productos";

type Props = {
    producto: IProducto | null;
    categorias: {_id: string, nombre:string}[] | null;
}

export default function FormEditarProducto({producto, categorias} : Props) {
    const [errorMsg, setErrorMsg] = useState('');
    const [nombre, setNombre] = useState(producto?.nombre);
    const [slug, setSlug] = useState(producto?.slug);
    const [categoria, setCategoria] = useState(producto?.categoria._id);
    const [descripcion, setDescripcion] = useState(producto?.descripcion);
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const respuesta = await editarProducto({_id: producto?._id, nombre, slug, categoria, descripcion});
        if (respuesta.ok) {
          router.push('/admin/productos');
        } else {
          setErrorMsg(respuesta.msg);
        } 
    }

    return (
        <>
            <h1 className=" text-4xl mb-5" >Editar Producto</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white rounded mb-5 border"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="slug">Slug</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white rounded mb-5 border"
                    type="text" 
                    placeholder="Slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                /> 
                <label htmlFor="categoria">Categoria</label>
                <select
                    value={producto?.categoria._id}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="border rounded p-2 mb-5 disabled:bg-gray-100 cursor-pointer disabled:cursor-default"
                >
                    <option value="">Seleccione la categoria</option>

                    {categorias?.map((categoria: any) => (
                        <option key={categoria._id} value={categoria._id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white rounded mb-5 border" 
                    placeholder="Descripción"
                    name="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

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
                        Editar
                    </button>
                </div>
                
            </form>
        </>
    )
}