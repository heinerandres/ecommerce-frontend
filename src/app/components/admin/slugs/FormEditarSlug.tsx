'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { editarSlug } from "@/src/services/api/server/slugs";

type Props = {
    _slug: {_id: string, slug:string, img1:string, img2:string, img3:string, img4:string, categoria:string, cantidadProductos:number} | null;
    categorias: {_id:string, nombre:string}[] | null;
}

export default function FormEditarSlug({_slug, categorias} : Props) {
    const [errorMsg, setErrorMsg] = useState('');
    const [slug, setSlug] = useState(_slug?.slug);
    const [img1, setImg1] = useState(`http://localhost:4000${_slug?.img1}`);
    const [img2, setImg2] = useState(`http://localhost:4000${_slug?.img2}`);
    const [img3, setImg3] = useState(`http://localhost:4000${_slug?.img3}`);
    const [img4, setImg4] = useState(`http://localhost:4000${_slug?.img4}`);
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [file3, setFile3] = useState<File | null>(null);
    const [file4, setFile4] = useState<File | null>(null);
    const [categoria, setCategoria] = useState(_slug?.categoria);
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("slug", slug!);
        formData.append("_id", _slug!._id);
        if(file1) formData.append("img1", file1);
        if(file2) formData.append("img2", file2);
        if(file3) formData.append("img3", file3);
        if(file4) formData.append("img4", file4);
        formData.append("categoria", categoria!);

        const respuestaEditar = await editarSlug(formData);
        if (respuestaEditar.ok) {
          router.push('/admin/slugs');
        } else {
          setErrorMsg(respuestaEditar.msg);
        }
    }

    const handleImages = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setImage: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const file = e.target.files?.[0];
        if(!file) return;
        setFile(e.target.files?.[0] || null);
        setImage(URL.createObjectURL(file));
    }

    return (
        <>
            <h1 className="md:text-2xl 2xl:text-4xl mb-5" >Editar Slug</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
                <label htmlFor="slug" className="md:text-sm 2xl:text-lg">Slug</label>
                <input
                    minLength={2}
                    required
                    className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border border-black/80 rounded mb-5"
                    type="text" 
                    placeholder="Slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                />
                <div className="flex gap-5 items-center">
                    <div className="h-[60px] w-[80px]">
                        <img className="h-full w-full object-cover rounded-md " src={img1}/>
                    </div>
                    <div className="mt-4 flex flex-col w-full">
                    <label htmlFor="img1">Imagen 1</label>
                    <input
                        minLength={2}
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
                    <div className="h-[60px] w-[80px]">
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
                    <div className="h-[60px] w-[80px]">
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
                    <div className="h-[60px] w-[80px]">
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
                <label htmlFor="categoria">Categoria</label>
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="border mb-5 rounded p-2"
                >
                    <option value="">Seleccione una categoría</option>

                    {categorias?.map((cat: any) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>

                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <div className="w-full flex justify-around md:mt-10 2xl:mt-10 md:text-sm 2xl:text-lg">
                    <Link href="./" className="border border-blue-600 md:py-1.5 2xl:py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
                    <button
                        type="submit"
                        className="bg-blue-600 md:py-1.5 2xl:py-2 rounded text-white cursor-pointer w-[45%]">
                        Editar
                    </button>
                </div>
                
            </form>
        </>
    )
}