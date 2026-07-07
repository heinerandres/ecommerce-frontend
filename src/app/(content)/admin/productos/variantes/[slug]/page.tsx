'use server';

import { IProducto } from "@/src/interfaces/producto";
import { getProductoBySlug } from "@/src/services/api/server/productos";
import { getImagenesByProducto } from "@/src/services/api/server/imagenes";
import FormVariantesProducto from "@/src/app/components/admin/producto/FormVariantesProducto";
import { getColores } from "@/src/services/api/server/colores";
import { getTallas } from "@/src/services/api/server/tallas";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getVariantes } from "@/src/services/api/server/variantes";

interface Props {
    params: {
        slug: string;
    }
}
export default async function ProductoIndividualPage( { params }: Props ) {

  const _params = await params;
  let producto : IProducto | null = null;
  let errorMsg, categorias, colores, tallas, variantes  = null;

  const respuestaProducto = await getProductoBySlug(_params.slug);
  if(respuestaProducto.ok) producto = respuestaProducto.producto;
  else errorMsg = respuestaProducto.msg;

  const respuesta = await getCategorias();
  if(respuesta.ok) categorias = respuesta.categorias;
  else errorMsg = respuesta.msg;

  const respuestaColores = await getColores();
  if(respuestaColores.ok) colores = respuestaColores.colores;
  else errorMsg = respuestaColores.msg;

  const respuestaTallas = await getTallas();
  if(respuesta.ok) tallas = respuestaTallas.tallas;
  else errorMsg = respuestaTallas.msg;

  const respuestaVariantes = await getVariantes();
  if(respuestaVariantes.ok) variantes = respuestaVariantes.variantes;
  else errorMsg = respuestaVariantes.msg;

  return (
    <>
        { errorMsg !== "" &&
            <span className="text-red-500">
            {errorMsg}
            </span>
        }
        <FormVariantesProducto
            producto={producto}
            variantes={variantes}
            categorias={categorias}
            colores={colores}
            tallas={tallas}
            />
    </>
  )
}