'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { insertarProducto } from "@/src/services/api/server/productos";

type Props = {
    categorias: {_id: string, nombre:string}[] | null;
}

export default function FormInsertarProducto({categorias}:Props) {
    const [nombre, setNombre] = useState('');
    const [slug, setSlug] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleInsertar = async(e:any) => {
        e.preventDefault();

        const producto = {
            nombre,
            slug,
            descripcion,
            categoria
        };

        const respuesta = await insertarProducto(producto);
        if (respuesta.ok) router.push('/admin/productos');
        else setErrorMsg(respuesta.msg);
    }

    return (
        <>
            <form onSubmit={handleInsertar} className="flex flex-col border border-gray-200 shadow-lg p-10 rounded-2xl">
                <h1 className=" text-4xl mb-5 font-semibold" >Nuevo Producto</h1>
                <label htmlFor="nombre" className="text-lg mb-2">Nombre</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => {
                        const nombre = e.target.value;

                        setNombre(nombre);

                        setSlug(
                            nombre
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .replace(/\s+/g, '_')
                                .replace(/[^a-z0-9_]/g, '')
                        );
                    }}
                />
                <div className="flex w-full">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="slug" className="text-lg mb-2">Slug</label>
                        <input
                            minLength={2}
                            required
                            className="px-5 py-2 bg-white border rounded mb-5"
                            type="text" 
                            placeholder="Slug"
                            name="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>
                    <div className="relative group inline-flex items-center">
                        <button 
                        type="button"
                        className="cursor-pointer">
                            <i className="text-lg text-blue-500 fa-solid fa-circle-info ml-3 mr-2"></i>
                        </button>
                        <div className="absolute left-1/2 -translate-x-1/2 top-15 mb-2 w-35
                                    hidden group-hover:block
                                    bg-gray-800 text-white text-xs
                                    px-2 py-1 rounded whitespace-normal z-10">
                        El slug es un identificador del producto para crear una URL.
                        </div>
                    </div>
                </div>
                <label htmlFor="descripcion" className="text-lg mb-2">Descripción</label>
                <textarea
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    placeholder="Descripción"
                    name="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <label htmlFor="categoria" className="text-lg mb-2">Categoria</label>
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="border rounded p-2  mb-3 disabled:bg-gray-100 cursor-pointer disabled:cursor-default"
                >
                    <option value="">Seleccione la categoria</option>

                    {categorias?.map((categoria: any) => (
                        <option key={categoria._id} value={categoria._id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <p className="text-xs text-gray-500">Agregar un producto nuevo</p>
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-around mt-10">
                    <Link href="./" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                    <button
                        type="submit"
                        className="bg-blue-600 py-2 rounded text-white cursor-pointer w-[45%]">
                            <i className="fa-regular fa-floppy-disk mr-3"></i>
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}