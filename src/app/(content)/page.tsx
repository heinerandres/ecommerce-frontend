'use server';
import { ImageBanner } from "../components/main/ImageBanner";
import { getProductos, getProductosConImagenes } from '@/src/services/api/server/productos';
import { IProducto } from '@/src/interfaces/producto';
import { Producto } from "../components/ProductosInicio/Producto";
import { getImagenes } from "@/src/services/api/server/imagenes";
import ProductoFilter from "../components/ProductosInicio/ProductoFilter";

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
      <div className="relative flex justify-center mt-[-18.7vh] xl:mt-[-26.6vh] 2xl:mt-[-28vh] z-10">
        {error && <p className="text-red-500">{error}</p>}
        <ProductoFilter productos={productos} imagenes={imagenes}/>
      </div>
    </div>
  );
}