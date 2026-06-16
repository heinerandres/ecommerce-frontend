'use server';

import EliminarTallas from "@/src/app/components/admin/tallas/EliminarTallas";
import { getTallas } from "@/src/services/api/server/tallas";
import Link from "next/link";


export default async function TallasPage() {
    let tallas: {_id: string, valor:string, cantidadProductos:number}[] | null = null;
    let errorMsg = null;

    const respuesta = await getTallas();
    if (respuesta.ok) {
      tallas = respuesta.talla;
      console.log(tallas);
    } else {
      errorMsg = respuesta.msg;
    }

    return (
        <div className="min-h-[70vh]">
      <h5 className="mt-10 ml-20 text-2xl font-bold">Tallas</h5>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="mt-10 px-20">
        <Link href="/admin/tallas/insertar" 
            className=" px-4 md:py-3 2xl:py-4 cursor-pointer rounded-lg bg-blue-300 text-sm font-medium">
                Agregar Talla Nueva
                <i className="fa-solid fa-shirt ml-2"></i>
        </Link>
        <table className="min-w-full mt-6">
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
                    <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {talla.valor}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                          {talla.cantidadProductos}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/tallas/${talla.valor}`} className="hover:underline">
                                <i className="fa-solid fa-pen-to-square md:text-md 2xl:text-xl drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
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
    )
}
