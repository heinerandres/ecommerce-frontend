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
      <div className="admin-div-principal">
        <div className="flex justify-between h-15">
          <div className="flex items-center">
            <div className="div-icono">
              <i className="fa-solid fa-tag text-xl text-blue-700"></i>
            </div>
            <div className="ml-4">
              <h5 className="text-2xl font-medium">CategorÃ­as</h5>
              <h3 className="text-gray-400">Gestiona las categorÃ­as disponibles en tu tienda.</h3>
            </div>
          </div>
          
          <Link href="/admin/categorias/insertar" 
            className="btn-agregar">
              <i className="fa-solid fa-plus mr-2"></i>
              {/* <i className="fa-solid fa-paintbrush ml-2"></i>
              <i className="fa-solid fa-palette mr-2"></i> */}
              Agregar CategorÃ­a
          </Link>
        </div>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="mt-10">
          <TablaCategorias categorias={categorias}/>
        </div>
      </div>
    )
}
