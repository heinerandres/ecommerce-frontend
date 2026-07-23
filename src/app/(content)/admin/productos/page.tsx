'use server';

import EliminarProducto from "@/src/app/components/admin/producto/EliminarProducto";
import { getCategorias } from "@/src/services/api/server/categorias";
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
        <div className="min-h-[82vh] mt-5 w-[80vw] border ml-10 border-gray-100 shadow-lg rounded-2xl">
          <div className="flex justify-between mt-10 h-15">
            <div className="flex ml-20 items-center">
              <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
                <i className="fa-solid fa-gift text-xl text-blue-700"></i>
              </div>
              <div className="ml-4">
                <h5 className="text-2xl font-medium">Productos</h5>
                <h3 className="text-gray-400">Gestiona los productos disponibles en tu tienda.</h3>
              </div>
            </div>
            
            <Link href="/admin/productos/insertar" 
              className="flex items-center mr-20 px-3 bg-blue-700 text-white rounded-lg cursor-pointer">
                <i className="fa-solid fa-plus mr-2"></i>
                {/* <i className="fa-solid fa-paintbrush ml-2"></i>
                <i className="fa-solid fa-palette mr-2"></i> */}
                Agregar Producto Nuevo
            </Link>
          </div>
        <div className="mt-10 px-19">
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <TablaProductos productos = { productos } />
        </div>
      </div>
    )
}
