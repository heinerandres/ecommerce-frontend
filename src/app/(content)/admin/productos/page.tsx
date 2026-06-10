'use server';



import EliminarProducto from "@/src/app/components/admin/producto/EliminarProducto";
import { IProducto } from "@/src/interfaces/producto";
import { getProductos } from "@/src/services/api/server/productos";
import Link from "next/link";


export default async function TallasPage() {
    let productos: IProducto[] | null = null;
    let errorMsg = null;

    const respuesta = await getProductos();
    if (respuesta.ok) {
      productos = respuesta.productos;
    } else {
      errorMsg = respuesta.msg;
    }

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
                Categoría
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Talla
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Color
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Ver detalles
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Editar
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
                          {producto.categoria}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                          {producto.talla}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                          {producto.color}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/productos/${producto.slug}`} className="hover:underline">
                                <i className="fa-solid fa-pen-to-square text-xl drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                 Editar producto
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
