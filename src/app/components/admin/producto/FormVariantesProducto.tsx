'use client';

import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { Dispatch, SetStateAction, useState } from "react";
import FormInsertarVariante from "../variantes/FormInsertarVariante";
import Modal from '@/src/app/components/modal/modal';
import FormEditarVariante from "../variantes/FormEditarVariante";
import EliminarVariante from "../variantes/EliminarVariante";
import { useRouter } from "next/navigation";
import FormImagenesVariante from "./FormImagenesVariante";

type Variante = {
  _id: string;
  producto: string;
  color: string;
  talla: string;
  precio: number;
  cantidad: number;
};


type Props = {
    producto: IProducto | null;
    variantes: {_id: string, producto: string, color: string, talla: string, precio: number, cantidad: number}[] | null;
    categorias: {_id: string, nombre: string}[] | null;
    colores: {_id: string, nombre:string, valor:string}[] | null;
    tallas: {_id: string, valor:string}[] | null;
    /* variantes: {producto: string, color: string, talla: string, precio: string, cantidad: string}[] | null; */
}

export default function FormVariantesProducto({producto, variantes, categorias, colores, tallas}:Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openImagenes, setOpenImagenes] = useState(false);
    const [varianteEditar, setVarianteEditar] = useState<Variante | null>(null);

    const onSuccess = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(false);
        router.push(`/admin/productos/variantes/${producto?.slug}`);
    }

    const handleEditar = (variante: {_id: string, producto: string, color: string, talla: string, precio: number, cantidad: number}) => {
        setVarianteEditar(variante);
        setOpenEditar(true);
    }
    const handleAdministrarImagenes = (variante: {_id: string, producto: string, color: string, talla: string, precio: number, cantidad: number}) => {
        setVarianteEditar(variante);
        setOpenImagenes(true);
    }

    return (
        <>
            <div className="flex flex-row justify-around">
                <div className="w-[25%] p-10 mt-18 border border-gray-400 rounded-2xl">
                    <h1 className=" text-2xl mb-5" >Información del Producto</h1>
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="nombre">Nombre</label>
                        <input
                            minLength={2}
                            disabled
                            className="px-5 py-2 bg-white rounded mb-5  disabled:cursor-default"
                            type="text" 
                            placeholder="Nombre"
                            name="nombre"
                            value={producto?.nombre}
                            
                        />
                        <div className="flex w-full">
                            <div className="flex flex-col flex-1">
                                <label className="font-bold" htmlFor="slug">Slug</label>
                                <input
                                    minLength={2}
                                    disabled
                                    className="px-5 py-2 bg-white rounded mb-5  disabled:cursor-default"
                                    type="text" 
                                    placeholder="Slug"
                                    name="slug"
                                    value={producto?.slug}
                                    
                                />
                            </div>
                        </div>
                        <label className="font-bold" htmlFor="descripcion">Descripción</label>
                        <textarea
                            minLength={2}
                            disabled
                            className="px-5 py-2 bg-white rounded disabled:cursor-default"
                            placeholder="Descripción"
                            name="descripcion"
                            value={producto?.descripcion}
                        />
                        <label className="font-bold" htmlFor="categoria">Categoria</label>
                        <input
                            value={categorias?.find(c => c._id === producto?.categoria)?.nombre}
                            disabled
                            type="text"
                            className="rounded p-2 mb-2 disabled:cursor-default"
                        />
                        
                        {/* <div className="w-full flex justify-around mt-10">
                            <Link href="/admin/productos" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                        </div> */}
                    </div>
                </div>
                <div className="mt-20 w-[65vw] ">
                <h1 className="flex justify-center text-2xl mb-5 pt-5">Variantes del Producto</h1>
                <button onClick={() =>  setOpen(true)}
                    className=" px-4 py-4 cursor-pointer rounded-lg bg-blue-300 text-sm font-medium">
                        Agregar Variante Nueva
                        <i className="fa-solid fa-gift ml-2"></i>
                        <i className="fa-solid fa-tag ml-1"></i>
                </button>
                <Modal 
                    open={open}
                    setOpen={setOpen}
                    title="Crear variante"
                    size="lg"
                >
                    <FormInsertarVariante _id={producto?._id} colores={colores} tallas={tallas} onSuccess={() => onSuccess(setOpen)}/>
                </Modal>

                <table className="min-w-full mt-6">
                <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Color
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Talla
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Precio
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Cantidad
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Editar
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Imagenes
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Eliminar
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    variantes?.map((variante, index) => (
                        <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                {colores?.find(color => color._id === variante?.color)?.nombre}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                {tallas?.find(talla => talla._id === variante?.talla)?.valor}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                {variante.precio}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                {variante.cantidad}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <button onClick={() =>  handleEditar(variante)} className="hover:underline cursor-pointer">
                                    <i className="fa-solid fa-pen-to-square text-lg drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                    Editar variante
                                </button>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <button onClick={() =>  handleAdministrarImagenes(variante)} className="hover:underline cursor-pointer">
                                    <i className="fa-solid fa-images text-lg drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                    Administrar Imagenes
                                </button>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <EliminarVariante variante={variante} producto={producto} />  
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Modal 
                open={openEditar}
                setOpen={setOpenEditar}
                title="Crear variante"
                size="lg"
            >
                <FormEditarVariante variante={varianteEditar} colores={colores} tallas={tallas} onSuccess={() => onSuccess(setOpenEditar)}/>
            </Modal>
            <Modal 
                open={openImagenes}
                setOpen={setOpenImagenes}
                title="Crear variante"
                size="lg"
            >
                {<FormImagenesVariante variante={varianteEditar} onSuccess={() => onSuccess(setOpenEditar)}/>}
            </Modal>


            </div>
            </div>
            
        </>
    )
}