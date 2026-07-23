'use server';
import EliminarColor from "@/src/app/components/admin/colores/EliminarColor";
import TablaColores from "@/src/app/components/admin/colores/tabla/TablaColores";
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
        <div className="min-h-[82vh] mt-5 w-[80vw] border ml-10 border-gray-100 shadow-lg rounded-2xl">
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
          <TablaColores colores={colores} />
        </div>
    </div>
    )
}
