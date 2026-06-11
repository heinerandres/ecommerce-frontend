'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getGeneralInformation } from "@/src/utilities/getGeneralInfo";

type Props = {
    productoA: IProducto[] | null;
}

export default function FormInsertarProducto() {
    
    //estados del producto
    const [nombre, setNombre] = useState('');
    const [slug, setSlug] = useState('');
    const [categoria, setCategoria] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [talla, setTalla] = useState('');
    const [color, setColor] = useState('');
    const [precio, setPrecio] = useState<number | undefined>();
    const [cantidad, setCantidad] = useState<number | undefined>();

    //estados de consulta de información 
    const [productos, setProductos] = useState<IProducto[] | null>([]);
    const [categorias, setCategorias] = useState([]);
    const [colores, setColores] = useState<{ _id: string; nombre: string; valor: string; }[] | null>([]);
    const [tallas, setTallas] = useState<{ _id: string; valor: string; }[] | null>([]);
    const [errorMsg, setErrorMsg] = useState('');

    //estados de la interfaz de usuario
    const [slugNuevo, setSlugNuevo] = useState(false);
    const router = useRouter();

    

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
            <h1 className=" text-4xl mb-5" >Nuevo Producto</h1>
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
                <div>
                    <input
                        minLength={2}
                        required
                        className="px-5 py-2 bg-gray-200 rounded mb-5 w-[68%]"
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
                        onChange={() => setSlugNuevo(!slugNuevo)}
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
                <label htmlFor="categoria">Slugs en Base de datos</label>
                <select
                    disabled={slugNuevo}
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="border mb-5 rounded p-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-75"
                >
                    <option value="">Seleccione una categoría</option>

                    {productos?.map((producto: any) => (
                        <option key={producto._id} value={producto.slug}>
                            {producto.slug}
                        </option>
                    ))}
                </select>
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
                <label htmlFor="img1">Imagen 1</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 mb-5 bg-white border rounded cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img1"
                    value={img1}
                    accept="image/*"
                    onChange={(e) => setImg1(e.target.value)}
                />
                <label htmlFor="img2">Imagen 2</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 mb-5 bg-white border rounded cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img2"
                    value={img2}
                    accept="image/*"
                    onChange={(e) => setImg2(e.target.value)}
                />
                <label htmlFor="img3">Imagen 3</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 mb-5 bg-white border rounded cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img3"
                    value={img3}
                    accept="image/*"
                    onChange={(e) => setImg3(e.target.value)}
                />
                <label htmlFor="img4">Imagen 4</label>
                <input
                    minLength={2}
                    required
                    className="px-5 py-2 mb-5 bg-white border rounded cursor-pointer"
                    type="file" 
                    placeholder="Imagen"
                    name="img4"
                    value={img4}
                    accept="image/*"
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