import { ImageBanner } from "../components/main/ImageBanner";
import { getProductos } from '@/src/services/api/server/productos';
import { IProducto } from '@/src/interfaces/producto';
import { Producto } from "../components/ProductosInicio/Producto";
import { getImagenes } from "@/src/services/api/server/imagenes";

export default async function Home() {
  let productos: IProducto[] = [];
  let imagenes: {_id: string, producto: string, url: string}[];
  let error = null;

  const respuesta = await getProductos();
  if (respuesta.ok) productos = respuesta.productos;
  else error = respuesta.msg;

  const respuestaImagenes = await getImagenes();
  if(respuestaImagenes.ok) imagenes = respuestaImagenes.imagenes;
  else error = respuestaImagenes.msg;

  
  
  return (
    <div className="md:text-sm 2xl:text-lg">
      <ImageBanner />
      <div className="relative flex justify-center h-[85vh] mt-[-28vh] z-10">
        {error && <p className="text-red-500">{error}</p>}
        <div className="w-[75vw] grid grid-cols-4 grid-rows-2 gap-4">
          {
            productos.map((producto, index) => (
              <Producto key={ index } producto = { producto } imgs={imagenes.filter(imagen => imagen.producto === producto._id)}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}