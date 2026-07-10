'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

import { editarVariante } from "@/src/services/api/server/variantes";
import { IVariante } from "@/src/interfaces/variante";

type Props = {
    variante: IVariante | null;
    colores: {_id: string, nombre:string, valor:string}[] | null;
    tallas: {_id: string, valor:string}[] | null;
    onSuccess: () => void;
}

export default function FormEditarVariante({variante, colores, tallas, onSuccess}:Props) {

    const [color, setColor] = useState(variante?.color.nombre);
    const [talla, setTalla] = useState(variante?.talla.valor);
    const [precio, setPrecio] = useState(variante?.precio);
    const [cantidad, setCantidad] = useState(variante?.cantidad);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const _variante = {
            _id: variante?._id,
            color,
            talla,
            precio,
            cantidad
        };

        const respuesta = await editarVariante(_variante);
        if (respuesta.ok) onSuccess();
        else setErrorMsg(respuesta.msg); 
    }

    return (
        <>
            <h1 className=" text-4xl mb-5" >Variante de Producto</h1>
            <form onSubmit={handleEditar} className="flex flex-col px-10">
                <label htmlFor="color">Color</label>
                <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="border rounded p-2  mb-2 disabled:bg-gray-100 cursor-pointer disabled:cursor-default"
                >
                    <option value="">Seleccione la categoria</option>

                    {colores?.map((_color: any) => (
                        <option key={_color._id} value={_color._id}>
                            {_color.nombre}
                        </option>
                    ))}
                </select>
                <label htmlFor="talla">Talla</label>
                <select
                    value={talla}
                    onChange={(e) => setTalla(e.target.value)}
                    className="border rounded p-2  mb-2 disabled:bg-gray-100 cursor-pointer disabled:cursor-default"
                >
                    <option value="">Seleccione la categoria</option>

                    {tallas?.map((_talla: any) => (
                        <option key={_talla._id} value={_talla._id}>
                            {_talla.valor}
                        </option>
                    ))}
                </select>
                <label htmlFor="precio">Precio</label>
                <input
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    type="number"
                    placeholder="Precio"
                    name="precio"
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value))}
                />
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    type="number"
                    placeholder="Cantidad"
                    name="cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                />
                
                

                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-around mt-10">
                    <button onClick={onSuccess} className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Cancelar</button>
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