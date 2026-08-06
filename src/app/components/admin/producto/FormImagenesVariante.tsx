'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { editarVariante } from "@/src/services/api/server/variantes";
import { editarImagenesVariante, getImagenesByVariante } from "@/src/services/api/server/imagenes";
import Link from "next/link";
import { IVariante } from "@/src/interfaces/variante";

type Props = {
    variante: IVariante | null;
    onSuccess: () => void;
}

export default function FormImagenesVariante({variante, onSuccess}:Props) {
    const [imagenesVariante, setImagenesVariante] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    //estados de las imagenes
    const [img1, setImg1] = useState<string | undefined>(undefined);
    const [img2, setImg2] = useState<string | undefined>(undefined);
    const [img3, setImg3] = useState<string | undefined>(undefined);
    const [img4, setImg4] = useState<string | undefined>(undefined);
    const [file1, setFile1] = useState<File | undefined>(undefined);
    const [file2, setFile2] = useState<File | undefined>(undefined);
    const [file3, setFile3] = useState<File | undefined>(undefined);
    const [file4, setFile4] = useState<File | undefined>(undefined);
    const router = useRouter();

    //inicializar la función antes de llamarla
    //crea la url de imagenes para mostrarlas
    const setImages = (data: {_id: string, variante: string, url: string }[] | null) => {
        const base = "http://localhost:4000/uploads/";
        setImg1(data?.[0] ? base + data[0].url : undefined);
        setImg2(data?.[1] ? base + data[1].url : undefined);
        setImg3(data?.[2] ? base + data[2].url : undefined);
        setImg4(data?.[3] ? base + data[3].url : undefined);
    };
    //consultar las imagenes por variante
    useEffect(() => {
        
        const obtenerImagenesVariante = async () => {
            const respuestaImagenes = await getImagenesByVariante({variante: variante?._id});
            if(respuestaImagenes.ok) {
                const _imagenes = respuestaImagenes.imagenes;
                setImagenesVariante(_imagenes);
            }
            else setErrorMsg(JSON.stringify(respuestaImagenes));
        }
        obtenerImagenesVariante();
    }, []);
    //despues de consultar las imagenes enviarlas al <img>
    useEffect(() => {
        if(!imagenesVariante) return;
        setImages(imagenesVariante);
    }, [imagenesVariante]);
    //editar imagenes de la variante
    const handleEditar = async(e:any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_id", variante?._id!);
        if(file1) formData.append("img1", file1);
        if(file2) formData.append("img2", file2);
        if(file3) formData.append("img3", file3);
        if(file4) formData.append("img4", file4);
        const respuesta = await editarImagenesVariante(formData);
        if (respuesta.ok) onSuccess();
        else setErrorMsg(JSON.stringify(respuesta)); 
    }
    //si el archivo del input cambia, cambia el <img>
    const handleImages = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
        setImage: React.Dispatch<React.SetStateAction<string | undefined>>
        ) => {
            const file = e.target.files?.[0];
            if(!file) return;
            setFile(e.target.files?.[0] || undefined);
            setImage(URL.createObjectURL(file));
        }
    return (
        <>
            <h1 className=" text-4xl p-3" >Variante</h1>
            <form onSubmit={handleEditar} className="flex flex-col px-10">
                <div className="flex">
                    <div className="flex border border-gray-300/60 p-4 rounded-xl">
                        <table className="h-45 ml-2 mr-8">
                            <tbody>
                                <tr className="border-b border-gray-300/60">
                                    <td>
                                        <div className="flex items-center justify-center px-2 py-2 mr-2 rounded-lg bg-blue-100">
                                            <i className="fa-solid fa-tag text-blue-500"></i>
                                        </div>
                                    </td>
                                    <td>
                                        <label className="py-1 font-semibold">Talla:</label>
                                    </td>
                                    <td>
                                        <label>{variante?.talla.valor}</label>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-300/60">
                                    <td>
                                        <div className="flex items-center justify-center px-2 py-2 mr-2 rounded-lg bg-blue-100">
                                            <i className="fa-solid fa-palette text-blue-500"></i>
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <label className="font-semibold">Color:</label>
                                    </td>
                                    <td>
                                        <label>{variante?.color.nombre}</label>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-300/60">
                                    <td>
                                        <div className="flex items-center justify-center px-2 py-2 mr-2 rounded-lg bg-blue-100">
                                            <i className="fa-solid fa-dollar text-blue-500"></i>
                                        </div>
                                    </td>
                                    <td>
                                        <label className="font-semibold">Precio:</label>
                                    </td>
                                    <td>
                                        <label>{variante?.precio}</label>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-300/60">
                                    <td>
                                        <div className="flex items-center justify-center px-2 py-2 mr-2 rounded-lg bg-blue-100">
                                            <i className="fa-solid fa-boxes text-blue-500"></i>
                                        </div>
                                    </td>
                                    <td>
                                        <label className="font-semibold mr-5">Disponibles:</label>
                                    </td>
                                    <td>
                                        <label>{variante?.cantidad}</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h1 className="flex text-2xl pb-2 pt-5 font-semibold">Imágenes de la variante</h1>
                <p className="mb-0 text-gray-400">Puedes mostrar hasta 4 imágenes de la variante</p>
                <div className="flex gap-5 items-center border border-gray-400/60 px-2 bg-blue-50 mb-2 rounded-lg">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img1}/>
                    </div>
                    <div className="flex flex-col w-full h-23">
                        <div className="flex gap-18 py-2">
                            <label htmlFor="img1" className="font-semibold">Imagen 1</label>
                            <div className="flex gap-1 items-center px-2 py-0.5 border text-blue-600 rounded-xl font-semibold text-xs bg-blue-100">
                                <i className="fa-solid fa-star"></i>
                                <p>Imagen principal</p>
                            </div>
                        </div>
                        <label
                            htmlFor="img1"
                            className="inline-flex items-center w-fit gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                        >
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            Cambiar imagen
                        </label>
                        <input
                            id="img1"
                            minLength={2}
                            required
                            className=" hidden mb-5 mt-3 bg-blue-50 rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                            type="file" 
                            placeholder="Imagen"
                            name="img1"
                            accept="image/*"
                            onChange={(e) => handleImages(e, setFile1, setImg1)}
                        />
                    </div>
                </div>
                <div className="flex gap-5 items-center border border-gray-500/60 px-2 mb-2 rounded-lg">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img2}/>
                    </div>
                    <div className="flex flex-col w-full h-23">
                        <div className="flex gap-10 py-2">
                            <label htmlFor="img2" className="font-semibold">Imagen 2</label>
                        </div>
                        <label
                            htmlFor="img2"
                            className="inline-flex items-center w-fit gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                        >
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            Cambiar imagen
                        </label>
                        <input
                            id="img2"
                            required
                            minLength={2}
                            className="hidden mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                            type="file" 
                            placeholder="Imagen 2"
                            name="img2"
                            accept="image/*"
                            onChange={(e) => handleImages(e, setFile2, setImg2)}
                        />
                    </div>
                </div>
                <div className="flex gap-5 items-center border border-gray-500/60 px-2 mb-2 rounded-lg">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img3}/>
                    </div>
                    <div className="flex flex-col w-full h-23">
                        <div className="flex gap-10 py-2">
                            <label htmlFor="img3" className="font-semibold">Imagen 3</label>
                        </div>
                        <label
                            htmlFor="img3"
                            className="inline-flex items-center w-fit gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                        >
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            Cambiar imagen
                        </label>
                        <input
                            id="img3"
                            minLength={2}
                            className="hidden mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                            type="file" 
                            placeholder="Imagen 3"
                            name="img3"
                            accept="image/*"
                            onChange={(e) => handleImages(e, setFile3, setImg3)}
                        />
                    </div>
                </div>
                <div className="flex gap-5 items-center border border-gray-500/60 px-2 rounded-lg">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img4}/>
                    </div>
                    <div className="flex flex-col w-full h-23">
                        <div className="flex gap-10 py-2">
                            <label htmlFor="img4" className="font-semibold">Imagen 4</label>
                        </div>
                        <label
                            htmlFor="img4"
                            className="inline-flex items-center w-fit gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                        >
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            Cambiar imagen
                        </label>
                        <input
                            id="img4"
                            minLength={2}
                            className="hidden mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                            type="file" 
                            placeholder="Imagen 4"
                            name="img4"
                            accept="image/*"
                            onChange={(e) => handleImages(e, setFile4, setImg4)}
                        />
                    </div>
                </div>
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-end gap-5 mt-10">
                    <button onClick={onSuccess} className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[30%] text-center hover:bg-blue-200">Regresar</button>
                    <button
                        type="submit"
                        className="bg-blue-600 py-2 rounded text-white cursor-pointer w-[30%]">
                            <i className="fa-regular fa-floppy-disk mr-3"></i>
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}