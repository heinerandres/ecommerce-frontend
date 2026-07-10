'use server';

import { IProducto } from "@/src/interfaces/producto";
import { getProductoBySlug } from "@/src/services/api/server/productos";
import FormVariantesProducto from "@/src/app/components/admin/producto/FormVariantesProducto";
import { getColores } from "@/src/services/api/server/colores";
import { getTallas } from "@/src/services/api/server/tallas";

interface Props {
    params: {
        slug: string;
    }
}
export default async function ProductoIndividualPage( { params }: Props ) {

  const _params = await params;
  let producto : IProducto | null = null;
  let errorMsg, colores, tallas  = null;

  const respuestaProducto = await getProductoBySlug(_params.slug);
  if(respuestaProducto.ok) producto = respuestaProducto.producto;
  else errorMsg = respuestaProducto.msg;

  const respuestaColores = await getColores();
  if(respuestaColores.ok) colores = respuestaColores.colores;
  else errorMsg = respuestaColores.msg;

  const respuestaTallas = await getTallas();
  if(respuestaTallas.ok) tallas = respuestaTallas.tallas;
  else errorMsg = respuestaTallas.msg;

  return (
    <div>
        { errorMsg !== "" &&
            <span className="text-red-500">
            {errorMsg}
            </span>
        }
        <FormVariantesProducto
            producto={producto}
            colores={colores}
            tallas={tallas}
            />
    </div>
  )
}