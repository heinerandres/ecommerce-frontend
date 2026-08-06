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
        const respuestaEditar = await editarTalla({_id: talla?._id, valor: valor?.toUpperCase()});
        if (respuestaEditar.ok) router.push('/admin/tallas');
        else setErrorMsg(respuestaEditar.msg);
    }
    return (
        
        <>
            
            <form onSubmit={handleEditar} className="flex flex-col border border-gray-200 shadow-lg p-10 rounded-2xl">
                <h1 className="md:text-2xl 2xl:text-4xl mb-5 font-semibold" >Editar</h1>
                <label htmlFor="nombre" className="md:text-sm 2xl:text-xl font-semibold mb-5">Talla</label>
                <input
                    required
                    className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
                <p className="text-xs text-gray-500">La talla se muestra en el menú del producto para la elección del cliente</p>
                <p className="text-xs text-gray-500">"S", "M", "26", "32"</p>

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