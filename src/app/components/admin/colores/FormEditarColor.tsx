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
        const _nombre = nombre ? nombre.charAt(0).toUpperCase() + nombre?.slice(1).toLowerCase() : "";
        const respuesta = await editarColor({_id: color?._id, nombre: _nombre, valor});
        if (respuesta.ok) router.push('/admin/colores');
        else setErrorMsg(respuesta.msg);
    }

    return (
        <>
            <form onSubmit={handleEditar} className="flex flex-col border border-gray-200 shadow-lg p-10 rounded-2xl">
                <h1 className="md:text-2xl 2xl:text-4xl mb-5 font-semibold" >Editar</h1>
                <label htmlFor="nombre" className="md:text-sm 2xl:text-lg font-semibold mb-5">Nombre</label>
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
                <label htmlFor="color" className="md:text-sm 2xl:text-lg font-semibold mb-5">Color</label>
                <input
                    minLength={2}
                    required
                    className="md:px-2 2xl:px-1 py-1 bg-gray-200 rounded-lg mb-2 w-full h-12 cursor-pointer"
                    type="color" 
                    placeholder="Color"
                    name="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                /> 
                <p className="text-xs text-gray-500">El color se muestra en el menú del producto para la elección del cliente</p>
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-around md:mt-4 2xl:mt-10 md:text-sm 2xl:text-lg">
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