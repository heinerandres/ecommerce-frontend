'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";

type Props = {
    productoA: IProducto[] | null;
}

export default function FormEditarProducto({productoA} : Props) {
    const producto = productoA?.[0];
    const [errorMsg, setErrorMsg] = useState('');
    const [nombre, setNombre] = useState(producto?.nombre);
    const [slug, setSlug] = useState(producto?.slug);
    const [categoria, setCategoria] = useState(producto?.categoria);
    const [img1, setImg1] = useState(producto?.img1);
    const [img2, setImg2] = useState(producto?.img2);
    const [img3, setImg3] = useState(producto?.img3);
    const [img4, setImg4] = useState(producto?.img4);
    const [descripcion, setDescripcion] = useState(producto?.descripcion);
    const [talla, setTalla] = useState(producto?.talla);
    const [color, setColor] = useState(producto?.color);
    const [precio, setPrecio] = useState<number | undefined>(producto?.precio);
    const [cantidad, setCantidad] = useState<number | undefined>(producto?.cantidad);
    const router = useRouter();

    const handleEditar = async(e:any) => {
        e.preventDefault();

        /* const respuesta = await editarProducto(
            {_id: color?._id, 
                nombre: nombre, 
                valor: valor});

        if (respuesta.ok) {
          router.push('/admin/productos');
        } else {
          setErrorMsg(respuesta.msg);
        } */
    }

    return (
        <>
            <h1 className=" text-4xl mb-5" >Editar Producto</h1>
            <form onSubmit={handleEditar} className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="slug">Slug</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                /> 
                <label htmlFor="categoria">Categoria</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Categoria"
                    name="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                /> 
                <label htmlFor="img1">Imagen 1</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Imagen"
                    name="img1"
                    value={img1}
                    onChange={(e) => setImg1(e.target.value)}
                />
                <label htmlFor="img2">Imagen 2</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Imagen"
                    name="img2"
                    value={img2}
                    onChange={(e) => setImg2(e.target.value)}
                />
                <label htmlFor="img3">Imagen 3</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Imagen"
                    name="img3"
                    value={img3}
                    onChange={(e) => setImg3(e.target.value)}
                />
                <label htmlFor="img1">Imagen 4</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Imagen"
                    name="img4"
                    value={img4}
                    onChange={(e) => setImg4(e.target.value)}
                />
                <label htmlFor="descripcion">Descripción</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Descripción"
                    name="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <label htmlFor="talla">Talla</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Talla"
                    name="talla"
                    value={talla}
                    onChange={(e) => setTalla(e.target.value)}
                />
                <label htmlFor="color">Color</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="text" 
                    placeholder="Talla"
                    name="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <label htmlFor="precio">Precio</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="number" 
                    name="precio"
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value))}
                />
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-gray-200 rounded mb-5"
                    type="number" 
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
                    <Link href="./" className="border border-blue-600 py-2 rounded text-black cursor-pointer w-[45%] text-center hover:bg-blue-200">Regresar</Link>
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