'use server';

import FormDetallesProducto from "@/src/app/components/admin/producto/FormDetallesProducto";
import { IProducto } from "@/src/interfaces/producto";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getProductoBySlug } from "@/src/services/api/server/productos";

interface Props {
    params: {
        slug: string;
    }
}
export default async function DetallesProductoPage( { params }: Props ) {

  const _params = await params;
  let producto : IProducto | null = null;
  let errorMsg = null;

  const respuestaProducto = await getProductoBySlug(_params.slug);
  if(respuestaProducto.ok) producto = respuestaProducto.producto;
  else errorMsg = respuestaProducto.msg;


  return (
    <div className="flex w-[80vw] min-h-[82vh] pt-20 ml-10 border-gray-100 shadow-lg rounded-2xl border">
          { errorMsg !== "" &&
              <span className="text-red-500">
              {errorMsg}
              </span>
          }
          <FormDetallesProducto 
              producto={producto}/>
  </div>
  )
}