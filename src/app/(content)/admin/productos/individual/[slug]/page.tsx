'use server';

import FormProductoIndividual from "@/src/app/components/admin/producto/FormProductoIndivivual";
import { IProducto } from "@/src/interfaces/producto";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getProductoBySlug } from "@/src/services/api/server/productos";
import { getImagenesByProducto } from "@/src/services/api/server/imagenes";

interface Props {
    params: {
        slug: string;
    }
}
export default async function ProductoIndividualPage( { params }: Props ) {
  const _params = await params;
  let producto : IProducto | null = null;
  let errorMsg, categorias = null;

  const respuestaProducto = await getProductoBySlug(_params.slug);
  if(respuestaProducto.ok) producto = respuestaProducto.producto;
  else errorMsg = respuestaProducto.msg;

  const respuesta = await getCategorias();
  if(respuesta.ok) categorias = respuesta.categorias;
  else errorMsg = respuesta.msg;

  return (
      <>
          { errorMsg !== "" &&
              <span className="text-red-500">
              {errorMsg}
              </span>
          }
          <FormProductoIndividual
              producto={producto}/>
      </>
  )
}