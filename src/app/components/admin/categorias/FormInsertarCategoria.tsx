'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { insertarCategoria } from "@/src/services/api/server/categorias";


export default function FormInsertarCategoria() {
    const [errorMsg, setErrorMsg] = useState('');
    const [nombre, setNombre] = useState('');
    const router = useRouter();

    const handleInsertar = async(e:any) => {
        e.preventDefault();
        const respuesta = await insertarCategoria({nombre});
        if (respuesta.ok) router.push('/admin/categorias');
        else setErrorMsg(respuesta.msg);
    }
    return (
        <>
            
            <form onSubmit={handleInsertar} className="flex flex-col border border-gray-200 shadow-lg p-10 rounded-2xl">
                <h1 className="md:text-2xl 2xl:text-4xl mb-5 font-semibold" >Insertar</h1>
                <label htmlFor="nombre" className="md:text-sm 2xl:text-lg font-semibold mb-5">Categoría</label>
                <input
                    minLength={2}
                    required
                    className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                    type="text" 
                    placeholder="Categoría"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <p className="text-xs text-gray-500">Inserte aquí la categoría para organizar los productos.</p>
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-around md:mt-10 2xl:mt-10 md:text-sm 2xl:text-lg">
                <Link href="./" className="border border-blue-600 md:py-1.5 2xl:py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                <button
                    type="submit"
                    className="bg-blue-600 md:py-1.5 2xl:py-2 rounded text-white cursor-pointer w-[45%]">
                    <i className="fa-regular fa-floppy-disk mr-3"></i>
                    Guardar
                </button>
            </div>
            </form>
        </>
        
    )
}