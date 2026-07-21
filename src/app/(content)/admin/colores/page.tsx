'use server';
import EliminarColor from "@/src/app/components/admin/colores/EliminarColor";
import { getColores } from "@/src/services/api/server/colores";
import Link from "next/link";


export default async function ColoresPage() {
    let colores: {_id: string, nombre:string, valor:string, cantidadProductos:number}[] | null = null;
    let errorMsg = null;

    const respuestaColor = await getColores();
    if (respuestaColor.ok) colores = respuestaColor.colores;
    else errorMsg = respuestaColor.msg;

    /* className=" px-4 md:py-3 2xl:py-4 cursor-pointer rounded-lg bg-blue-300 text-sm font-medium"> */

    return (
        <div className="min-h-[82vh] w-[80vw] border ml-10 border-gray-100 shadow-lg rounded-2xl">
        <div className="flex justify-between mt-10 h-15">
          <div className="flex ml-20 items-center">
            <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
              <i className="fa-solid fa-paintbrush text-xl text-blue-700"></i>
              <i className="fa-solid fa-palette text-2xl text-blue-700"></i>
            </div>
            <div className="ml-4">
              <h5 className="text-2xl font-medium">Colores</h5>
              <h3 className="text-gray-400">Gestiona los colores disponibles en tu tienda.</h3>
            </div>
          </div>
          
          <Link href="/admin/colores/insertar" 
            className="flex items-center mr-20 px-3 bg-blue-700 text-white rounded-lg cursor-pointer">
              <i className="fa-solid fa-plus mr-2"></i>
              {/* <i className="fa-solid fa-paintbrush ml-2"></i>
              <i className="fa-solid fa-palette mr-2"></i> */}
              Agregar Color Nuevo
          </Link>
        </div>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="mt-10 px-20">
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-200 border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                    Nombre
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 md:py-3 2xl:py-4 text-left">
                    Color
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
                    colores?.map((color, index) => (
                        <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out">
                            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <div style={{backgroundColor: color.valor}}  className="border md:w-6 2xl:w-8 md:h-6 2xl:h-8 rounded-full mr-5"></div>
                                <p className="font-medium">{color.nombre}</p>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <p className="uppercase text-gray-400">{color.valor}</p>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                              {color.cantidadProductos}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <Link 
                                  href={`/admin/colores/${color.nombre}`} className="hover:underline p-3 rounded-lg px-6">
                                    <i style={{color: color.valor}}  className="fa-solid fa-paintbrush md:text-sm 2xl:text-md drop-shadow-[0.8px_0.8px_0.8px_black] mr-3"></i>
                                    Editar color
                                </Link>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                <EliminarColor color={color} />
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
