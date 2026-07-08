'use server';

import EliminarProducto from "@/src/app/components/admin/producto/EliminarProducto";
import { getCategorias } from "@/src/services/api/server/categorias";
import Link from "next/link";
import { getProductos } from "@/src/services/api/server/productos";
import { IProducto } from "@/src/interfaces/producto";


export default async function ProductosPage() {
  let errorMsg = null;
  let productos : IProducto[] | null = null;
  let categorias : {_id: string, nombre:string }[] | null = null;
  

  const respuestaProductos = await getProductos();
  if(respuestaProductos.ok) productos = respuestaProductos.productos;
  else errorMsg = respuestaProductos.msg;

  const respuestaCategoria = await getCategorias();
  if(respuestaCategoria.ok) categorias = respuestaCategoria.categorias;
  else errorMsg = respuestaCategoria.msg;

    return (
        <div className="min-h-[70vh]">
        <h5 className="mt-10 ml-20 text-2xl font-bold">Productos</h5>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="mt-10 px-20">
          <Link href="/admin/productos/insertar" 
              className=" px-4 py-4 cursor-pointer rounded-lg bg-blue-300 text-sm font-medium">
                  Agregar Producto Nuevo
                  <i className="fa-solid fa-gift ml-2"></i>
                  <i className="fa-solid fa-tag ml-1"></i>
          </Link>
          <table className="min-w-full mt-6">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Nombre
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Categoria
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Ver detalles
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Editar
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Imagenes
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Variantes
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Agregar Precio y Cantidad (Producto sin variantes)
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {
                  productos?.map((producto, index) => (
                      <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {producto.nombre}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 ">
                            {categorias?.find(categoria => categoria._id === producto.categoria)?.nombre}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 ">
                              <Link href={`/admin/productos/detalles/${producto.slug}`} className="cursor-pointer hover:underline">
                                <i className="fa-solid fa-circle-info text-md mr-2"></i>
                                Ver detalles
                              </Link>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 ">
                              <Link href={`/admin/productos/editar/${producto.slug}`} className="hover:underline">
                                  <i className="fa-solid fa-pen-to-square text-lg drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                  Editar producto
                              </Link>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 ">
                              <Link href={`/admin/productos/imagenes/${producto.slug}`} className="hover:underline">
                                  <i className="fa-solid fa-images text-md drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                  Administrar Imagenes
                              </Link>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/productos/variantes/${producto.slug}`} className="hover:underline">
                              <i className="fa-solid fa-sitemap text-lg mr-2"></i>
                                Variantes del Producto
                            </Link>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/productos/individual/${producto.slug}`} className="hover:underline">
                              <i className="fa-solid fa-tag text-lg mr-2"></i>
                                Agregar Precio, Cantidad e Imagenes
                            </Link>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 ">
                            <EliminarProducto producto={producto} /> 
                        </td>
                      </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
}
