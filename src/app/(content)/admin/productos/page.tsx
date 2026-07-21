'use server';

import EliminarProducto from "@/src/app/components/admin/producto/EliminarProducto";
import { getCategorias } from "@/src/services/api/server/categorias";
import Link from "next/link";
import { getProductos } from "@/src/services/api/server/productos";
import { IProducto } from "@/src/interfaces/producto";


export default async function ProductosPage() {
  let errorMsg = null;
  let productos : IProducto[] | null = null;

  const respuestaProductos = await getProductos();
  if(respuestaProductos.ok) productos = respuestaProductos.productos;
  else errorMsg = respuestaProductos.msg;

    return (
        <div className="min-h-[82vh] w-[80vw] border ml-10 border-gray-100 shadow-lg rounded-2xl">
          <div className="flex justify-between mt-10 h-15">
            <div className="flex ml-20 items-center">
              <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
                <i className="fa-solid fa-gift text-xl text-blue-700"></i>
              </div>
              <div className="ml-4">
                <h5 className="text-2xl font-medium">Productos</h5>
                <h3 className="text-gray-400">Gestiona los productos disponibles en tu tienda.</h3>
              </div>
            </div>
            
            <Link href="/admin/productos/insertar" 
              className="flex items-center mr-20 px-3 bg-blue-700 text-white rounded-lg cursor-pointer">
                <i className="fa-solid fa-plus mr-2"></i>
                {/* <i className="fa-solid fa-paintbrush ml-2"></i>
                <i className="fa-solid fa-palette mr-2"></i> */}
                Agregar Producto Nuevo
            </Link>
          </div>
        <div className="mt-10 px-19">
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-md pb-20">
            <table className="min-w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Nombre
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Categoria
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Estado
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    <i className="fa-solid fa-clipboard-list text-md mr-2"></i>
                    Detalles
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    <i className="fa-solid fa-pen text-md mr-2"></i>
                    Editar
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    <i className="fa-solid fa-images text-md mr-2"></i>
                    Imagenes
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    <i className="fa-solid fa-tag text-lg mr-2"></i>
                    Variantes
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    <i className="fa-solid fa-trash mr-2 text-md"></i>
                    Eliminar
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                    productos?.map((producto, index) => (
                        <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="flex items-center text-sm  text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                {producto.nombre}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                              {producto.categoria.nombre}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                              { (producto.cantidad || producto.precio) && <span className="text-balck-500 font-light">Sin variantes</span>}   
                              { (producto.variantes?.length !== 0 && (!producto.cantidad || !producto.precio)) && <span className="text-orange-400 font-light">Con variantes</span>}          
                              { ((!producto.cantidad || !producto.precio) && (producto.variantes?.length === 0)) && <span className="text-blue-500 font-light">Nuevo</span>}   
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <Link href={`/admin/productos/detalles/${producto.slug}`} className="cursor-pointer hover:underline">
                                  
                                  Ver Detalles
                                </Link>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <Link href={`/admin/productos/editar/${producto.slug}`} className="hover:underline">
                                    Editar
                                </Link>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                              { (producto?.imagenes?.length === 0) && 
                              <div className="relative group inline-flex items-center">
                                <i className="fa-solid fa-circle-info text-md text-blue-500 mr-2 cursor-pointer"></i>
                                <div className="absolute left-1/2 -translate-x-1/2 top-5 mb-2 w-35
                                            hidden group-hover:block
                                            bg-gray-800 text-white text-xs
                                            px-2 py-1 rounded whitespace-normal z-100">
                                Los productos sin imágenes no se muestran en la página principal.
                                </div>
                              </div>
                              }
                                <Link href={`/admin/productos/imagenes/${producto.slug}`} className="hover:underline">
                                    Imagenes
                                </Link>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                              {(producto.cantidad || producto.precio) ? (
                                <Link href={`/admin/productos/individual/${producto.slug}`} className="hover:underline">
                                    Sin Variantes
                                </Link>
                              ):(
                                <Link href={`/admin/productos/variantes/${producto.slug}`} className="hover:underline">
                                    Variantes
                                </Link>
                              )}
                              
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
      </div>
    )
}
