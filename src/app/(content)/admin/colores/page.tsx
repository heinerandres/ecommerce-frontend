'use server';
import { getColores } from "@/src/services/api/server/colores";
import Link from "next/link";


export default async function Colores() {
    let colores: {_id: string, nombre:string, valor:string, cantidadProductos:number}[] | null = null;
    let errorMsg = null;

    const respuestaColor = await getColores();
    if (respuestaColor.ok) {
      colores = respuestaColor.colores;
      console.log(colores);
    } else {
      errorMsg = respuestaColor.msg;
    }

    return (
        <div className="min-h-[70vh]">
      <h5 className="mt-10 ml-20 text-2xl font-bold">Colores</h5>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="mt-10 px-20">
        <Link href="/admin/colores/insertar" className=" px-4 py-4 cursor-pointer rounded-lg bg-blue-300 text-sm font-medium">Agregar Color Nuevo<i className="fa-solid fa-paintbrush ml-2"></i><i className="fa-solid fa-palette ml-2"></i></Link>
        <table className="min-w-full mt-6">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Color
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Productos 
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
                colores?.map((color, index) => (
                    <tr key={index} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div style={{backgroundColor: color.valor}}  className="border w-9 h-9 rounded-full"></div>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {color.nombre}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                          {color.cantidadProductos}
                        </td>
                        
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/colores/${color.nombre}`} className="hover:underline">
                                <i style={{color: color.valor}}  className="fa-solid fa-pen-to-square text-xl drop-shadow-[0.8px_0.8px_0.8px_black] mr-2"></i>
                                 Editar color
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
