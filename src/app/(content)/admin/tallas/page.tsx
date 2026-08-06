'use server';

import EliminarTallas from "@/src/app/components/admin/tallas/EliminarTallas";
import TablaTallas from "@/src/app/components/admin/tallas/tabla/TablaTallas";
import { getTallas } from "@/src/services/api/server/tallas";
import Link from "next/link";


export default async function TallasPage() {
    let tallas: {_id: string, valor:string, cantidadProductos:number}[] | null = null;
    let errorMsg = null;

    const respuesta = await getTallas();
    if (respuesta.ok) tallas = respuesta.tallas;
    else errorMsg = respuesta.msg;

    return (
      <div className="admin-div-principal">
        <div className="flex justify-between h-15">
          <div className="flex items-center">
            <div className="div-icono">
              <i className="fa-solid fa-shirt text-xl text-blue-700"></i>
            </div>
            <div className="ml-4">
              <h5 className="text-2xl font-medium">Tallas</h5>
              <h3 className="text-gray-400">Gestiona las tallas disponibles en tu tienda.</h3>
            </div>
          </div>
          
          <Link href="/admin/tallas/insertar" 
            className="btn-agregar">
              <i className="fa-solid fa-plus mr-2"></i>
              {/* <i className="fa-solid fa-paintbrush ml-2"></i>
              <i className="fa-solid fa-palette mr-2"></i> */}
              Agregar Talla
          </Link>
        </div>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="mt-10">
          <TablaTallas tallas={tallas} />
        </div>
      </div>
    )
}