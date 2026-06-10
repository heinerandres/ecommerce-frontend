import { ProductoClient } from "@/src/app/components/ProductoDetalle/ProductoClient";
import { ProductoSlides } from "@/src/app/components/ProductoDetalle/ProductoSlices";
import { getGeneralInformation } from "@/src/utilities/getGeneralInfo";


export default async function ProductoPage ({ params }: { params: { slug:string }}) {
    const _params = await params;
    const {productos, tallas, colores, errorMsg} = await getGeneralInformation(_params.slug);

    const tieneTalla = productos?.some(producto => producto.talla !== undefined);
    const tieneColor = productos?.some(producto => producto.color !== undefined);


  return (
    <div className="flex justify-center h-[80vh] mt-[2%]">
      <div className="flex h-full w-[80%]">
        <div className="w-[50%]">
          <ProductoSlides producto= {productos?.[0] ?? null} />
        </div>
        <div className="p-[2%] md:w-[40%] 2xl:w-[30%] md:h-[65%] 2xl:h-[55%] ml-[10%] rounded-xl shadow-xl">
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <h4 className="text-2xl font-bold">{ productos?.[0].nombre }</h4>
          <p className="mt-[4%]">{ productos?.[0].descripcion }</p>

          {!tieneTalla && !tieneColor ? ( 
            <div>sin talla, sin color</div>
          ) : !tieneTalla && tieneColor ? (
            <div>solo color</div>
          ) : (
            <ProductoClient productos= {productos} tallas={tallas} colores={colores}/>
          )
          }

          
      </div>
      </div>
    </div>
  )
}