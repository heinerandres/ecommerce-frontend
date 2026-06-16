'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getGeneralInformation } from "@/src/utilities/getGeneralInfo";
import { insertarProducto } from "@/src/services/api/server/productos";

type Props = {
    productoA: IProducto[] | null;
}

export default function FormInsertarProducto() {
    
    //estados del producto
    const [nombre, setNombre] = useState('');
    const [slug, setSlug] = useState('');
    const [categoria, setCategoria] = useState('');
    const [img1, setImg1] = useState<File | null>(null);
    const [img2, setImg2] = useState<File | null>(null);
    const [img3, setImg3] = useState<File | null>(null);
    const [img4, setImg4] = useState<File | null>(null);
    const [descripcion, setDescripcion] = useState('');
    const [talla, setTalla] = useState('');
    const [color, setColor] = useState('');
    const [precio, setPrecio] = useState<number | undefined>(0);
    const [cantidad, setCantidad] = useState<number | undefined>(0);

    //estados de consulta de información 
    const [productos, setProductos] = useState<IProducto[] | null>([]);
    const [categorias, setCategorias] = useState([]);
    const [colores, setColores] = useState<{ _id: string; nombre: string; valor: string; }[] | null>([]);
    const [tallas, setTallas] = useState<{ _id: string; valor: string; }[] | null>([]);
    const [errorMsg, setErrorMsg] = useState('');

    //estados de la interfaz de usuario
    const [slugNuevo, setSlugNuevo] = useState(false);
    const router = useRouter();
    const inputImg1Ref = useRef<HTMLInputElement>(null);
    const inputImg2Ref = useRef<HTMLInputElement>(null);
    const inputImg3Ref = useRef<HTMLInputElement>(null);
    const inputImg4Ref = useRef<HTMLInputElement>(null);

    

    useEffect(() => {
        const consultarCategorias = async () => {
            const respuestaCategoria = await getCategorias();
            if(respuestaCategoria.ok) setCategorias(respuestaCategoria.categorias);
            else setErrorMsg(respuestaCategoria.msg);
        };
        const consultarInformacionGeneral = async () => {
            const respuesta = await getGeneralInformation();

            setProductos(respuesta.productos);
            setTallas(respuesta.tallas);
            setColores(respuesta.colores);
            setErrorMsg(respuesta.errorMsg);
        };
        consultarInformacionGeneral();
        consultarCategorias();
    }, []);

    const handleSlugNuevo = () => {
        setSlugNuevo(!slugNuevo)
        setSlug("");
        setImg1(null);
        setImg2(null);
        setImg3(null);
        setImg4(null);
        inputImg1Ref.current!.value = "";
        inputImg2Ref.current!.value = "";
        inputImg3Ref.current!.value = "";
        inputImg4Ref.current!.value = "";
    }

    const handleInsertar = async(e:any) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("nombre", nombre);
        formData.append("slug", slug);
        formData.append("categoria", categoria);
        if(img1) formData.append("img1", img1);
        if(img2) formData.append("img2", img2);
        if(img3) formData.append("img3", img3);
        if(img4) formData.append("img4", img4);
        formData.append("descripcion", descripcion);
        formData.append("talla", talla);
        formData.append("color", color);
        if(precio !== undefined) formData.append("precio", precio.toString());
        if(cantidad !== undefined) formData.append("cantidad", cantidad.toString());

        const respuesta = await insertarProducto(formData);
        if (respuesta.ok) router.push('/admin/productos');
        else setErrorMsg(respuesta.msg);
        
    }

    return (
        <>
            <h1 className=" text-4xl mb-5" >Nuevo Producto</h1>
            <form onSubmit={handleInsertar} className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    type="text" 
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="slug">Slug</label>
                <div>
                    <input
                        disabled={(!slugNuevo)}
                        minLength={2}
                        required
                        className="px-5 py-2 bg-white border rounded mb-5 w-[68%] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-75"
                        type="text" 
                        placeholder="Slug"
                        name="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    /> 
                    <label htmlFor="slugNuevo">
                    <input
                        className="mx-2 scale-120"
                        type="checkbox"
                        name="slugNuevo"
                        checked={slugNuevo} 
                        onChange={handleSlugNuevo}
                    />Slug Nuevo</label>
                    <div className="relative inline-block group">
                        <button 
                            type="button"
                            className="cursor-pointer">
                            <i className="fa-solid fa-circle-info ml-2 text-blue-500"></i>
                        </button>
                        <div className="absolute hidden group-hover:block top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm p-2 rounded w-48 z-10">
                            Slug agrupa tipos de productos para poder mostrarlos individualmente en el inicio y en la búsqueda.
                            Ejemplo: camisetas_algodon tienen el mismo slug para camisetas de algodon talla S y talla M
                        </div>
                    </div>
                </div>
                <label htmlFor="slugs">Slugs en Base de datos</label>
                <select
                    disabled={slugNuevo}
                    value={categoria}
                    onChange={(e) => setSlug(e.target.value)}
                    className="border mb-5 rounded p-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-75"
                >
                    <option value="">Seleccione una categoría</option>

                    {productos?.map((producto: any) => (
                        <option key={producto._id} value={producto.slug}>
                            {producto.slug}
                        </option>
                    ))}
                </select>
                
                    <div className={`w-full h-full transition-all duration-1000 ease-in-out ovreflow-hidden ${slugNuevo ? "max-h-[500px]" : "max-h-0 opacity-0 pointer-events-none"}`}>
                        <hr className="my-2 border-gray-300" />
                        <h1 className="font-medium text-lg mb-4">Imagenes del slug</h1>
                        <div className="flex flex-col">
                            <label htmlFor="img1">Imagen 1</label>
                            <input
                                ref={inputImg1Ref}
                                minLength={2}
                                required
                                className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-3 file:bg-white file:cursor-pointer"
                                type="file" 
                                placeholder="Imagen"
                                name="img1"
                                accept="image/*"
                                onChange={(e) => setImg1(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="img2">Imagen 2</label>
                            <input
                                ref={inputImg2Ref}
                                minLength={2}
                                required
                                className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-3 file:bg-white file:cursor-pointer"
                                type="file" 
                                placeholder="Imagen"
                                name="img2"
                                accept="image/*"
                                onChange={(e) => setImg2(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="img3">Imagen 3</label>
                            <input
                                ref={inputImg3Ref}
                                minLength={2}
                                required
                                className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-3 file:bg-white file:cursor-pointer"
                                type="file" 
                                placeholder="Imagen"
                                name="img3"
                                accept="image/*"
                                onChange={(e) => setImg3(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="img4">Imagen 4</label>
                            <input
                                ref={inputImg4Ref}
                                minLength={2}
                                required
                                className="mb-5 mt-3 bg-white rounded file:border file:px-3 file:py-1 file:mr-3 file:bg-white file:cursor-pointer"
                                type="file" 
                                placeholder="Imagen"
                                name="img4"
                                accept="image/*"
                                onChange={(e) => setImg4(e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>
                
                <hr className="my-2 border-gray-300" />
                <label htmlFor="categoria">Categoria</label>
                <select
                    value={categoria}
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
                
                <label htmlFor="talla">Talla</label>
                <select
                    value={talla}
                    onChange={(e) => setTalla(e.target.value)}
                    className="border rounded p-2  mb-5"
                >
                    <option value="">Seleccione una talla</option>

                    {tallas?.map((talla: any) => (
                        <option key={talla._id} value={talla._id}>
                            {talla.valor}
                        </option>
                    ))}
                </select>
                <label htmlFor="color">Color</label>
                <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="border rounded p-2 mb-5"
                >
                    <option value="">Seleccione un color</option>

                    {colores?.map((c:any) => (
                        <option key={c._id} value={c._id}>
                            {c.nombre}
                        </option>
                    ))}
                </select>
                <label htmlFor="descripcion">Descripción</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    type="text" 
                    placeholder="Descripción"
                    name="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <label htmlFor="precio">Precio</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    placeholder="Precio"
                    type="number" 
                    name="precio"
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value))}
                />
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 bg-white border rounded mb-5"
                    placeholder="cantidad"
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
                        Agregar
                    </button>
                </div>
                
            </form>
        </>
    )
}