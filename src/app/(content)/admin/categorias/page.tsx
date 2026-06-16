'use server';


//import EliminarCategoria from "@/src/app/components/admin/categorias/EliminarCategorias";
import { getCategoria } from "@/src/services/api/server/categorias";
import Link from "next/link";


export default async function CategoriasPage() {
    let categorias: {_id: string, nombre:string, cantidadCategorias:number}[] | null = null;
    let errorMsg = null;

    const respuesta = await getCategoria();
    if (respuesta.ok) {
      categorias = respuesta.categorias;
      console.log(categorias);
    } else {
      errorMsg = respuesta.msg;
    }

    return (
        <div className="min-h-[70vh]">
      <h5 className="mt-10 ml-20 text-2xl font-bold">Categorias</h5>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="mt-10 px-20">
        <Link href="/admin/categorias/insertar" 
            className=" px-4 md:py-3 2xl:py-4 cursor-pointer rounded-lg bg-blue-300 text-sm font-medium">
                Agregar Categoria Nueva
                <i className="fa-solid fa-shirt ml-2"></i>
        </Link>
        <table className="min-w-full mt-6">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Categoria
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Cantidad
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Opciones
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {
                categorias?.map((categoria, index) => (
                    <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {categoria.nombre}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6  ">
                          {categoria.cantidadCategorias}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/categorias/${categoria.nombre}`} className="hover:underline">
                                <i className="fa-solid fa-pen-to-square md:text-md 2xl:text-xl drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                 Editar Categoria
                            </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/categoria/${categoria.nombre}`} className="hover:underline">
                                <i className="fa-solid fa-pen-to-square md:text-md 2xl:text-xl drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                 Eliminar Categoria
                            </Link>
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
