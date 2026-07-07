import { ProductoClient } from "@/src/app/components/ProductoDetalle/ProductoClient";
import { ProductoSlides } from "@/src/app/components/ProductoDetalle/ProductoSlices";
import { getProductoBySlug } from "@/src/services/api/server/productos";
import { getImagenesByProducto } from '@/src/services/api/server/imagenes';
import { getVariantesByProducto } from "@/src/services/api/server/variantes";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductoPage ({ params }: Props) {
    const _params = await params;

    let error, producto, imagenes, variantes = null;

    const respuesta = await getProductoBySlug(_params.slug);
    if (respuesta.ok) producto = respuesta.producto;
    else error = respuesta.msg;

    const respuestaImagenes = await getImagenesByProducto({producto: producto?._id});
    if(respuestaImagenes.ok) imagenes = respuestaImagenes.imagenes;
    else error = respuesta.msg;

    const respuestaVariantes = await getVariantesByProducto({producto: producto?._id});
    if(respuestaVariantes.ok) variantes = respuestaVariantes.variantes;
    else error = respuestaVariantes.msg;

  return (
    <div className="flex justify-center h-[80vh] mt-[2%]">
      <div className="flex h-full w-[80%]">
        <div className="w-[50%]">
          <ProductoSlides imagenes={imagenes} />
        </div>
        <div className="p-[2%] md:w-[40%] 2xl:w-[30%] md:h-[65%] 2xl:h-[55%] ml-[10%] rounded-xl shadow-xl">
          {error && <p className="text-red-500">{error}</p>}
          <h4 className="text-2xl font-bold">{ producto?.nombre }</h4>
          <p className="mt-[4%]">{ producto?.descripcion }</p>
          
          <ProductoClient producto={producto} variantes={variantes} />

      </div>
      </div>
    </div>
  )
}