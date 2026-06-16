'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { editarCategoria } from "@/src/services/api/server/categorias";

type Props = {
    categoria: {_id: string, nombre:string} | null;
}

export default function FormEditarcategoria({categoria} : Props) {
    const [errorMsg, setErrorMsg] = useState('');
    const [nombre, setNombre] = useState(categoria?.nombre);
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const respuestaEditar = await editarCategoria({_id: categoria?._id, nombre: nombre});

        if (respuestaEditar.ok) {
          router.push('/admin/categorias');
        } else {
          setErrorMsg(respuestaEditar.msg);
        }
    }

    return (
        <>
            <h1 className="md:text-2xl 2xl:text-4xl mb-5" >Editar Categoria</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
                <label htmlFor="nombre" className="md:text-sm 2xl:text-lg">Nombre</label>
                <input
                    minLength={2}
                    required
                    className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

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
                        Editar
                    </button>
                </div>
                
            </form>
        </>
    )
}