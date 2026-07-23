'use client';

import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { currencyFormat } from '../../../../utilities/currencyFormat';

type Props = {
    producto: IProducto | null;
}

export default function FormDetallesProducto({producto}:Props) {

    return (
        <div className="flex w-full p-10">
            <div className="flex flex-col border border-gray-200 shadow-lg p-10 rounded-2xl">
                <h1 className="text-4xl mb-5 font-semibold">Información del Producto</h1>
                <label htmlFor="nombre" className="mb-2">Nombre</label>
                <input
                    minLength={2}
                    disabled
                    className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={producto?.nombre}
                    
                />
                <div className="flex w-full">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="slug" className="mb-2">Slug</label>
                        <input
                            minLength={2}
                            disabled
                            className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                            type="text" 
                            placeholder="Slug"
                            name="slug"
                            value={producto?.slug}
                            
                        />
                    </div>
                </div>
                <label htmlFor="descripcion" className="mb-2">Descripción</label>
                <textarea
                    minLength={2}
                    disabled
                    className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                    placeholder="Descripción"
                    name="descripcion"
                    value={producto?.descripcion}
                />
                <label htmlFor="categoria" className="mb-2">Categoria</label>
                <input
                    value={producto?.categoria.nombre}
                    disabled
                    type="text"
                    className="border rounded p-2  mb-3 disabled:bg-gray-100 disabled:cursor-default"
                />
                <p className="text-xs text-gray-500">Más información sobre el producto seleccionado.</p>
                <div className="w-full flex justify-around mt-10">
                    <Link href="/admin/productos" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                </div>
            </div>
            {
                ((producto?.variantes?.length ?? 0) === 0 && producto?.precio && producto?.cantidad ) ? (
                    <div className="w-[25vw] p-10 ml-35 border border-gray-300 rounded-xl shadow-md">
                        <h1 className=" text-2xl mb-3 font-semibold">Producto sin variantes</h1>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="precio">Precio</label>
                            <input
                                minLength={2}
                                disabled
                                className="px-5 py-2 bg-white border rounded mb-3 disabled:bg-gray-100"
                                type="number" 
                                placeholder="Precio"
                                name="precio"
                                value={producto?.precio}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="precio">Cantidad</label>
                            <input
                                minLength={2}
                                disabled
                                className="px-5 py-2 bg-white border rounded disabled:bg-gray-100"
                                type="number" 
                                placeholder="Cantidad"
                                name="cantidad"
                                value={producto?.cantidad}
                            />
                        </div>
                    </div>
                ): ((producto?.variantes?.length ?? 0) > 0) ? (
                    <div className="w-[65%] ml-10 p-7 border border-gray-300 rounded-xl shadow-md">
                        <h1 className="flex text-2xl mb-5 pt-2 font-semibold">Variantes del Producto</h1>
                        <div className="border border-gray-300 mt-6 rounded-xl overflow-hidden">
                            <table className="min-w-full ">
                                <thead className="bg-gray-200 border-b border-gray-300">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Talla
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Color
                                        </th>
                                        
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Precio
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Cantidad
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    producto?.variantes?.map((variante, index) => (
                                        <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-6 ">
                                                {variante.talla.valor}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                {variante.color.nombre}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 ">
                                                {currencyFormat(variante.precio)}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 ">
                                                {variante.cantidad}
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p className="text-3xl font-semibold p-10 text-blue-500">Producto nuevo</p>
                )
            }
        </div>
    )
}