import { ImageBanner } from "../components/main/ImageBanner";
import { getProductos, getProductosConImagenes } from '@/src/services/api/server/productos';
import { IProducto } from '@/src/interfaces/producto';
import { Producto } from "../components/ProductosInicio/Producto";
import { getImagenes } from "@/src/services/api/server/imagenes";
import ProductoFilter from "../components/ProductosInicio/ProductoFilter";
import { BenefitsBanner } from "../components/main/BenefitsBanner";

export default async function Home() {
  let productos: IProducto[] = [];
  let imagenes: {_id: string, producto: string, url: string}[] = [];
  let error = null;

  const respuesta = await getProductosConImagenes();
  if (respuesta.ok) productos = respuesta.productos;
  else error = respuesta.msg;

  const respuestaImagenes = await getImagenes();
  if(respuestaImagenes.ok) imagenes = respuestaImagenes.imagenes;
  else error = respuestaImagenes.msg;

  return (
    <div className="">
      <ImageBanner />
      <BenefitsBanner />
      {/* <div className="h-[5vh] flex items-center justify-center text-sm mb-5">
        <div className="flex gap-5 items-center h-full w-[87%] xl:w-[85%] 2xl:w-[78%] px-5 shadow-xs">
          <p className="font-semibold">Explora nuestras categorías</p>
          <div className="border border-gray-300 flex items-center gap-2 py-1 px-2 rounded-xl">
            <i className="fa-solid fa-star text-amber-300"></i>
            <p>Destacados</p>
          </div>
          <div className="border border-gray-300  flex items-center gap-2 py-1 px-2 rounded-xl">
            <i className="fa-solid fa-shirt"></i>
            <p>Ropa</p>
          </div>
          <div className="border border-gray-300  flex items-center gap-2 py-1 px-2 rounded-xl">
            <i className="fa-solid fa-computer"></i>
            <p>Tecnología</p>
          </div>
          <div className="border border-gray-300  flex items-center gap-2 py-1 px-2 rounded-xl">
            <i className="fa-solid fa-bag-shopping"></i>
            <p>Accesorios</p>
          </div>
          <div className="border border-gray-300 flex items-center gap-2 py-1 px-2 rounded-xl">
            <i className="fa-solid fa-house"></i>
            <p>Hogar</p>
          </div>
          <div className="flex items-center ml-auto gap-2 cursor-pointer hover:underline">
            <p>Ver todas las categorías</p>
            <i className="fa-solid fa-up-right-from-square text-xs"></i>
          </div>
        </div>
      </div> */}

      <div className="relative flex justify-center z-10">
        {error && <p className="text-red-500">{error}</p>}
        <ProductoFilter productos={productos} imagenes={imagenes}/>
      </div>
    </div>
  );
}