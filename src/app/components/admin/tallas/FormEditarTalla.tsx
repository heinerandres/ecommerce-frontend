'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { editarTalla } from "@/src/services/api/server/tallas";

type Props = {
    talla: {_id: string, valor:string} | null;
}

export default function FormEditarTalla({talla} : Props) {
    const [errorMsg, setErrorMsg] = useState('');
    const [valor, setValor] = useState(talla?.valor);
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const respuestaEditar = await editarTalla({_id: talla?._id, valor: valor});

        if (respuestaEditar.ok) {
          router.push('/admin/tallas');
        } else {
          setErrorMsg(respuestaEditar.msg);
        }
    }

    return (
        
        <>
            <h1 className="md:text-2xl 2xl:text-4xl mb-5" >Editar Talla</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
                <label htmlFor="nombre" className="md:text-sm 2xl:text-lg">Nombre</label>
                <input
                    minLength={2}
                    required
                    className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
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