'use server';

import EliminarTallas from "@/src/app/components/admin/tallas/EliminarTallas";
import { getTallas } from "@/src/services/api/server/tallas";
import Link from "next/link";


export default async function TallasPage() {
    let tallas: {_id: string, valor:string, cantidadProductos:number}[] | null = null;
    let errorMsg = null;

    const respuesta = await getTallas();
    if (respuesta.ok) tallas = respuesta.tallas;
    else errorMsg = respuesta.msg;

    return (
      <div className="min-h-[82vh] w-[80vw] border ml-10 border-gray-100 shadow-lg rounded-2xl">
        <div className="flex justify-between mt-10 h-15">
          <div className="flex ml-20 items-center">
            <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
              <i className="fa-solid fa-shirt text-xl text-blue-700"></i>
            </div>
            <div className="ml-4">
              <h5 className="text-2xl font-medium">Tallas</h5>
              <h3 className="text-gray-400">Gestiona las tallas disponibles en tu tienda.</h3>
            </div>
          </div>
          
          <Link href="/admin/tallas/insertar" 
            className="flex items-center mr-20 px-3 bg-blue-700 text-white rounded-lg cursor-pointer">
              <i className="fa-solid fa-plus mr-2"></i>
              {/* <i className="fa-solid fa-paintbrush ml-2"></i>
              <i className="fa-solid fa-palette mr-2"></i> */}
              Agregar Talla Nueva
          </Link>
        </div>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="mt-10 px-20">
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                    Talla
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                    Productos
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
                    tallas?.map((talla, index) => (
                        <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out">
                            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {talla.valor}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                              {talla.cantidadProductos}
                            </td>
                            <td className="text-sm text-black/50 font-light px-6 ">
                                <Link href={`/admin/tallas/${talla.valor}`} className="hover:underline p-3 rounded-xl">
                                    <i className="fa-solid fa-pen-to-square md:text-md 2xl:text-lg drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                    Editar talla
                                </Link>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                              <EliminarTallas talla={talla} />
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
