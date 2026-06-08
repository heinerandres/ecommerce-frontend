'use client';
import { editarColor } from "@/src/services/api/server/colores";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

type Props = {
    color: {_id: string, nombre:string, valor:string} | null;
}

export default function FormEditarColor({color} : Props) {
    const [errorMsg, setErrorMsg] = useState('');
    const [nombre, setNombre] = useState(color?.nombre);
    const [valor, setValor] = useState(color?.valor);
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const respuestaEditar = await editarColor({_id: color?._id, nombre: nombre, valor: valor});

        if (respuestaEditar.ok) {
          router.push('/admin/colores');
        } else {
          setErrorMsg(respuestaEditar.msg);
        }
    }

    return (
        <>
            <h1 className=" text-4xl mb-5" >Editar Color</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="color">Color</label>
                <input
                    minLength={2}
                    required
                    className="px-1 py-1 bg-gray-200 rounded-lg mb-8 w-full h-12 cursor-pointer"
                    type="color" 
                    placeholder="Color"
                    name="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                /> 

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
                        Editar
                    </button>
                </div>
                
            </form>
        </>
    )
}