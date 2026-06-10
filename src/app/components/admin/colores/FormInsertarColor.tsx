'use client';
import { insertarColor } from "@/src/services/api/server/colores";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function FormInsertarColor() {
    const [errorMsg, setErrorMsg] = useState('');
    const [nombre, setNombre] = useState('');
    const [valor, setValor] = useState('#FFFFFF');
    const router = useRouter();

    const handleInsertar = async(e:any) => {
        e.preventDefault();

        const respuestaInsertar = await insertarColor({nombre: nombre, valor: valor});

        if (respuestaInsertar.ok) {
          router.push('/admin/colores');
        } else {
          setErrorMsg(respuestaInsertar.msg);
        }
    }

    return (
        <>
            <h1 className="md:text-2xl 2xl:text-4xl mb-5" >Insertar</h1>
            <form onSubmit={handleInsertar} className="flex flex-col">
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
                <label htmlFor="color" className="md:text-sm 2xl:text-lg">Color</label>
                <input
                    minLength={2}
                    required
                    className="md:px-2 2xl:px-1 py-1 bg-gray-200 rounded-lg mb-8 w-full h-12 cursor-pointer"
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
                <div className="w-full flex justify-around md:mt-4 2xl:mt-10 md:text-sm 2xl:text-lg">
                <Link href="./" className="border border-blue-600 md:py-1.5 2xl:py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                <button
                    type="submit"
                    className="bg-blue-600 md:py-1.5 2xl:py-2 rounded text-white cursor-pointer w-[45%]">
                    Insertar
                </button>
            </div>
            </form>
        </>
        
    )
}