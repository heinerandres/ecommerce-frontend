import { ProductoClient } from "@/src/app/components/ProductoDetalle/ProductoClient";
import { ProductoSlides } from "@/src/app/components/ProductoDetalle/ProductoSlices";
import { getProductoBySlug } from "@/src/services/api/server/productos";
import { getImagenesByProducto } from '@/src/services/api/server/imagenes';
import { BenefitsBanner } from "@/src/app/components/main/BenefitsBanner";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductoPage ({ params }: Props) {
    const _params = await params;

    let error, producto, imagenes = null;

    const respuesta = await getProductoBySlug(_params.slug);
    if (respuesta.ok) producto = respuesta.producto;
    else error = respuesta.msg;

    const respuestaImagenes = await getImagenesByProducto({producto: producto?._id});
    if(respuestaImagenes.ok) imagenes = respuestaImagenes.imagenes;
    else error = respuesta.msg;

  return (
    <div className="flex flex-col items-center h-fit mt-[2%]">
      <div className="flex h-full w-[80%]">
        <div className="w-[50%]">
          <ProductoSlides imagenes={imagenes} />
        </div>
        <div className="p-10 lg:p-5 2xl:p-13 h-fit ml-[10%] rounded-xl shadow-xl border border-gray-400">
          {error && <p className="text-red-500">{error}</p>}
          <h4 className="text-2xl font-bold">{ producto?.nombre }</h4>
          <p className="mt-[4%]">{ producto?.descripcion }</p>
          
          <ProductoClient producto={producto}  />

        </div>
      </div>
      <div className="w-full mt-4">
        <BenefitsBanner />
      </div>
    </div>
  )
}