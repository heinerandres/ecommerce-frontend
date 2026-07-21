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
import { IVariante } from "@/src/interfaces/variante";
import { IColor } from "@/src/interfaces/color";
import { ITalla } from "@/src/interfaces/talla";

type Props = {
    producto: IProducto | null;
    colores: IColor[] | null;
    tallas: ITalla[] | null;
    /* variantes: {producto: string, color: string, talla: string, precio: string, cantidad: string}[] | null; */
}

export default function FormVariantesProducto({producto, colores, tallas}:Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openImagenes, setOpenImagenes] = useState(false);
    const [varianteEditar, setVarianteEditar] = useState<IVariante | null>(null);

    const onSuccess = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(false);
        router.push(`/admin/productos/variantes/${producto?.slug}`);
    }

    const handleEditar = (variante: IVariante) => {
        setVarianteEditar(variante);
        setOpenEditar(true);
    }
    const handleAdministrarImagenes = (variante: IVariante) => {
        setVarianteEditar(variante);
        setOpenImagenes(true);
    }

    return (
        <>
            <div className="w-[80vw] min-h-[82vh] pt-0 ml-10 border border-gray-100 shadow-lg rounded-2xl ">
                <div className="">
                    <div className="flex justify-between mt-10 h-15">
                        <div className="flex ml-20 items-center">
                            <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
                                <i className="fa-solid fa-sitemap text-xl text-blue-700"></i>
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-medium">Variantes del Producto</h5>
                                <h3 className="text-gray-400">Gestiona las variantes del producto.</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="self-start w-[23%] p-10 mt-5 ml-10 border border-gray-300 rounded-2xl shadow-md">
                        <h1 className=" text-2xl mb-5 font-semibold" >Información del Producto</h1>
                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="nombre">Nombre</label>
                            <input
                                minLength={2}
                                disabled
                                className="py-2 bg-white rounded mb-5  disabled:cursor-default"
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
                                        className="py-2 bg-white rounded mb-5  disabled:cursor-default"
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
                                className="py-2 bg-white rounded disabled:cursor-default"
                                placeholder="Descripción"
                                name="descripcion"
                                value={producto?.descripcion}
                            />
                            <label className="font-bold" htmlFor="categoria">Categoria</label>
                            <input
                                value={producto?.categoria.nombre}
                                disabled
                                type="text"
                                className="rounded mb-2 disabled:cursor-default"
                            />
                        </div>
                    </div>
                    <div className="w-[65%] mt-5 ml-10 p-7 border border-gray-300 rounded-xl shadow-md">
                        <h1 className="flex text-2xl mb-5 pt-2 font-semibold">Variantes del Producto</h1>
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

                        <div className="border border-gray-300 mt-6 rounded-xl overflow-hidden">
                            <table className="min-w-full ">
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
                                    producto?.variantes?.map((variante, index) => (
                                        <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                                                {variante.color.nombre}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 ">
                                                {variante.talla.valor}
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
                        </div>
                        <div className="w-full flex mt-10">
                            <Link href="/admin/productos" 
                                className="border border-blue-600 py-2 px-5 rounded text-black cursor-pointer text-center hover:bg-blue-200">
                                Regresar
                            </Link>
                        </div> 
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
                            {<FormImagenesVariante variante={varianteEditar} onSuccess={() => onSuccess(setOpenImagenes)}/>}
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}