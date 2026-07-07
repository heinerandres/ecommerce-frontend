'use client';

import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { useEffect, useState } from "react";
import { editarProductoConImagenes } from "@/src/services/api/server/productos";
import { useRouter } from "next/navigation";

type Props = {
    producto: IProducto | null;
    categorias: {_id: string, nombre: string}[] | null;
    imagenes: {_id: string, producto: string, url: string }[] | null;
}

export default function FormProductoIndividual({producto, categorias, imagenes}:Props) {
    const [precio, setPrecio] = useState(producto?.precio ?? '');
    const [cantidad, setCantidad] = useState(producto?.cantidad ?? '');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    //estados de las imagenes
    const [img1, setImg1] = useState<string | undefined>(undefined);
    const [img2, setImg2] = useState<string | undefined>(undefined);
    const [img3, setImg3] = useState<string | undefined>(undefined);
    const [img4, setImg4] = useState<string | undefined>(undefined);
    const [file1, setFile1] = useState<File | undefined>(undefined);
    const [file2, setFile2] = useState<File | undefined>(undefined);
    const [file3, setFile3] = useState<File | undefined>(undefined);
    const [file4, setFile4] = useState<File | undefined>(undefined);

    

    useEffect(() => {
        const setImages = (data: {_id: string, producto: string, url: string }[] | null) => {
            const base = "http://localhost:4000/uploads/";

            setImg1(data?.[0] ? base + data[0].url : undefined);
            setImg2(data?.[1] ? base + data[1].url : undefined);
            setImg3(data?.[2] ? base + data[2].url : undefined);
            setImg4(data?.[3] ? base + data[3].url : undefined);
        };
        setImages(imagenes);
    }, []);

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

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("_id", producto?._id!);
        formData.append("nombre", producto?.nombre!);
        formData.append("slug", producto?.slug!);
        formData.append("descripcion", producto?.descripcion!);
        formData.append("categoria", producto?.categoria!);
        formData.append("precio", String(precio));
        formData.append("cantidad", String(cantidad));
        if(file1) formData.append("img1", file1);
        if(file2) formData.append("img2", file2);
        if(file3) formData.append("img3", file3);
        if(file4) formData.append("img4", file4);
        
        const respuestaEditar = await editarProductoConImagenes(formData);
        if (respuestaEditar.ok) {
          router.push('/admin/productos');
        } else {
          setErrorMsg(respuestaEditar.msg);
        }
    }

    return (
        <>
            <h1 className=" text-4xl mb-5" >Información del Producto</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
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
                        <label htmlFor="slug">Slug</label>
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
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    minLength={2}
                    disabled
                    className="px-5 py-2 bg-white border rounded mb-5 disabled:bg-gray-100 disabled:cursor-default"
                    placeholder="Descripción"
                    name="descripcion"
                    value={producto?.descripcion}
                />
                <label htmlFor="categoria">Categoria</label>
                <input
                    value={categorias?.find(c => c._id === producto?.categoria)?.nombre}
                    disabled
                    type="text"
                    className="border rounded p-2  mb-2 disabled:bg-gray-100 disabled:cursor-default"
                />
                <hr className="my-4 border-gray-300" />
                <h1 className=" text-2xl mb-5" >Información adicional para el producto sin variantes</h1>
                <div className="flex flex-col flex-1">
                    <label htmlFor="precio">Precio</label>
                    <input
                        minLength={2}
                        required
                        className="px-5 py-2 bg-white border rounded mb-5"
                        type="number" 
                        placeholder="Precio"
                        name="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="precio">Cantidad</label>
                    <input
                        minLength={2}
                        required
                        className="px-5 py-2 bg-white border rounded mb-5"
                        type="number" 
                        placeholder="Cantidad"
                        name="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                </div>
                <div className="flex gap-5 items-center">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img1}/>
                    </div>
                    <div className="mt-4 flex flex-col w-full">
                    <label htmlFor="img1">Imagen 1</label>
                    <input
                        minLength={2}
                        required
                        className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                        type="file" 
                        placeholder="Imagen"
                        name="img1"
                        accept="image/*"
                        onChange={(e) => handleImages(e, setFile1, setImg1)}
                    />
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img2}/>
                    </div>
                    <div className="mt-4 flex flex-col w-full">
                    <label htmlFor="img2">Imagen 2</label>
                    <input
                        minLength={2}
                        className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                        type="file" 
                        placeholder="Imagen 2"
                        name="img2"
                        accept="image/*"
                        onChange={(e) => handleImages(e, setFile2, setImg2)}
                    />
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img3}/>
                    </div>
                    <div className="mt-4 flex flex-col w-full">
                    <label htmlFor="img3">Imagen 3</label>
                    <input
                        minLength={2}
                        className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                        type="file" 
                        placeholder="Imagen 3"
                        name="img3"
                        accept="image/*"
                        onChange={(e) => handleImages(e, setFile3, setImg3)}
                    />
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <div className="h-15 w-20">
                        <img className="h-full w-full object-cover rounded-md " src={img4}/>
                    </div>
                    <div className="mt-4 flex flex-col w-full">
                    <label htmlFor="img2">Imagen 4</label>
                    <input
                        minLength={2}
                        className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
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
                <div className="w-full flex justify-around mt-10">
                    <Link href="/admin/productos" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                    <button
                        type="submit"
                        className="bg-blue-600 py-2 rounded text-white cursor-pointer w-[45%]">
                        Agregar
                    </button>
                </div>
            </form>
        </>
    )
}