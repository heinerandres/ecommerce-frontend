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
            <h1 className="ml-5 text-4xl mt-5" >Variante de Producto</h1>
            <p className="ml-5 mb-8 mt-1 text-gray-400">Edita los detalles de la nueva variante</p>
            <form onSubmit={handleEditar} className="flex flex-col px-10">
                <label htmlFor="talla">Talla</label>
                <div className="relative">
                    <i className="absolute fa-solid fa-ruler text-blue-500 pl-4 pt-3"></i>
                    <select
                        value={talla}
                        onChange={(e) => setTalla(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 mb-2 pl-10 disabled:bg-gray-100 cursor-pointer disabled:cursor-default focus:outline-none focus:border focus:border-blue-400"
                    >
                        <option value="">Seleccione la categoria</option>
                        {tallas?.map((_talla: any) => (
                            <option key={_talla._id} value={_talla._id}>
                                {_talla.valor}
                            </option>
                        ))}
                    </select>
                </div>
                <label htmlFor="color">Color</label>
                <div className="relative">
                    <i className="absolute fa-solid fa-palette text-blue-500 pl-4 pt-3"></i>
                    <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 mb-2 pl-10 disabled:bg-gray-100 cursor-pointer disabled:cursor-default focus:outline-none focus:border focus:border-blue-400"
                    >
                        <option value="">Seleccione la categoria</option>
                        {colores?.map((_color: any) => (
                            <option key={_color._id} value={_color._id}>
                                {_color.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <label htmlFor="precio">Precio</label>
                <div className="relative">
                    <i className="absolute fa-solid fa-dollar text-blue-500 pl-4 pt-3 rounded-full text-lg"></i>
                    <input
                        required
                        className="px-5 py-2 pl-11 bg-white border border-gray-300 rounded mb-5 w-full placeholder:text-gray-400 focus:outline-none focus:border focus:border-blue-400"
                        type="number"
                        placeholder="Precio"
                        name="precio"
                        value={precio}
                        onChange={(e) => setPrecio(Number(e.target.value))}
                    />
                </div>
                <label htmlFor="cantidad">Cantidad</label>
                <div className="relative">
                    <i className="absolute fa-solid fa-boxes-stacked text-blue-500 pl-4 pt-3 rounded-full text-lg"></i>
                    <input
                        required
                        className="w-full px-5 py-2 pl-11 bg-white border border-gray-300 rounded mb-5 placeholder:text-gray-400 focus:outline-none focus:border focus:border-blue-400"
                        type="number"
                        placeholder="Cantidad"
                        name="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-end mt-8 gap-5">
                    <button onClick={onSuccess} className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[30%] text-center hover:bg-blue-200">Cancelar</button>
                    <button
                        type="submit"
                        className="bg-blue-600 py-2 rounded text-white cursor-pointer w-[30%]">
                            <i className="fa-regular fa-floppy-disk mr-2"></i>
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}