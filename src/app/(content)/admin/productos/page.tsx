'use server';

import Link from "next/link";
import { getProductos } from "@/src/services/api/server/productos";
import { IProducto } from "@/src/interfaces/producto";
import TablaProductos from "@/src/app/components/admin/producto/tabla/TablaProductos";


export default async function ProductosPage() {
  let errorMsg = null;
  let productos : IProducto[] | null = null;

  const respuestaProductos = await getProductos();
  if(respuestaProductos.ok) productos = respuestaProductos.productos;
  else errorMsg = respuestaProductos.msg;

    return (
        <div className="admin-div-principal">
          <div className="flex justify-between h-15">
            <div className="flex items-center">
              <div className="div-icono">
                <i className="fa-solid fa-gift text-xl text-blue-700"></i>
              </div>
              <div className="ml-4">
                <h5 className="text-2xl font-medium">Productos</h5>
                <h3 className="text-gray-400">Gestiona los productos disponibles en tu tienda.</h3>
              </div>
            </div>
            
            <Link href="/admin/productos/insertar" 
              className="btn-agregar">
                <i className="fa-solid fa-plus mr-2"></i>
                {/* <i className="fa-solid fa-paintbrush ml-2"></i>
                <i className="fa-solid fa-palette mr-2"></i> */}
                Agregar Producto
            </Link>
          </div>
        <div className="mt-10">
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <TablaProductos productos = { productos } />
        </div>
      </div>
    )
}
