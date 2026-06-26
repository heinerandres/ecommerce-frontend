'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { insertarSlug } from "@/src/services/api/server/slugs";
import { getCategorias } from "@/src/services/api/server/categorias";


export default function FormInsertarSlug() {
    const [errorMsg, setErrorMsg] = useState('');
    const [slug, setSlug] = useState('');
    const [img1, setImg1] = useState<File | null>(null);
    const [img2, setImg2] = useState<File | null>(null);
    const [img3, setImg3] = useState<File | null>(null);
    const [img4, setImg4] = useState<File | null>(null);
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const consultarCategorias = async () => {
            const respuestaCategoria = await getCategorias();
            if(respuestaCategoria.ok) setCategorias(respuestaCategoria.categorias);
            else setErrorMsg(respuestaCategoria.msg);
        };
        consultarCategorias();
    }, []);

    const handleInsertar = async(e:any) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("slug", slug);
        if(img1) formData.append("img1", img1);
        if(img2) formData.append("img2", img2);
        if(img3) formData.append("img3", img3);
        if(img4) formData.append("img4", img4);
        formData.append("categoria", categoria);

        const respuesta = await insertarSlug(formData);
        console.log(respuesta);
        if (respuesta.ok) router.push('/admin/slugs');
        else setErrorMsg(respuesta.msg);
    }

    return (
        <>
            <h1 className="md:text-2xl 2xl:text-4xl mb-5" >Insertar</h1>
            <form onSubmit={handleInsertar} className="flex flex-col">
                <label htmlFor="slug" className="md:text-sm 2xl:text-lg">Slug</label>
                <input
                    minLength={2}
                    required
                    className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                />
                <label htmlFor="img1">Imagen 1</label>
                <input
                    minLength={2}
                    required
                    className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img1"
                    accept="image/*"
                    onChange={(e) => setImg1(e.target.files?.[0] || null)}
                />
                <label htmlFor="img2">Imagen 2</label>
                <input
                    minLength={2}
                    required
                    className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img2"
                    accept="image/*"
                    onChange={(e) => setImg2(e.target.files?.[0] || null)}
                />
                <label htmlFor="img3">Imagen 3</label>
                <input
                    minLength={2}
                    required
                    className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img3"
                    accept="image/*"
                    onChange={(e) => setImg3(e.target.files?.[0] || null)}
                />
                <label htmlFor="img4">Imagen 4</label>
                <input
                    minLength={2}
                    required
                    className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-8 file:bg-white file:cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img4"
                    accept="image/*"
                    onChange={(e) => setImg4(e.target.files?.[0] || null)}
                />
                <label htmlFor="categoria">Categoria</label>
                <select
                    value={categoria}
                    required
                    onChange={(e) => setCategoria(e.target.value)}
                    className="border mb-5 rounded p-2"
                >
                    <option value="">Seleccione una categoría</option>

                    {categorias.map((cat: any) => (
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
                    Insertar
                </button>
            </div>
            </form>
        </>
        
    )
}