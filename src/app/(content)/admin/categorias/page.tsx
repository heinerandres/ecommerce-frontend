'use server';

import EliminarCategoria from "@/src/app/components/admin/categorias/EliminarCategoria";
import TablaCategorias from "@/src/app/components/admin/categorias/tabla/TablaCategorias";
import { getCategorias } from "@/src/services/api/server/categorias";
import Link from "next/link";


export default async function CategoriasPage() {
    let categorias: {_id: string, nombre: string, cantidadProductos: number}[] | null = null;
    let errorMsg = null;

    const respuesta = await getCategorias();
    if (respuesta.ok) categorias = respuesta.categorias;
    else errorMsg = respuesta.msg;

    return (
      <div className="min-h-[82vh] mt-5 w-[80vw] border ml-10 border-gray-100 shadow-lg rounded-2xl">
        <div className="flex justify-between mt-10 h-15">
          <div className="flex ml-20 items-center">
            <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
              <i className="fa-solid fa-tag text-xl text-blue-700"></i>
            </div>
            <div className="ml-4">
              <h5 className="text-2xl font-medium">Categorías</h5>
              <h3 className="text-gray-400">Gestiona las categorías disponibles en tu tienda.</h3>
            </div>
          </div>
          
          <Link href="/admin/categorias/insertar" 
            className="flex items-center mr-20 px-3 bg-blue-700 text-white rounded-lg cursor-pointer">
              <i className="fa-solid fa-plus mr-2"></i>
              {/* <i className="fa-solid fa-paintbrush ml-2"></i>
              <i className="fa-solid fa-palette mr-2"></i> */}
              Agregar Categoría Nueva
          </Link>
        </div>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="mt-10 px-20">
          <TablaCategorias categorias={categorias}/>
        </div>
      </div>
    )
}
