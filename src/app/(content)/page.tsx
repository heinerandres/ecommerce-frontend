import { ImageBanner } from "../components/main/ImageBanner";
import { getProductos } from '@/src/services/api/server/productos';
import { IProducto } from '@/src/interfaces/producto';
import { Producto } from "../components/ProductosInicio/Producto";

export default async function Home() {
  let productos: IProducto[] = [];
  let error = null;

  try {
    const respuesta = await getProductos();

    if (respuesta.ok) {
      //productos = respuesta.producto;
      //agrupa los productos por slug
      productos = [
        ...new Map<string, IProducto>(
          respuesta.producto.map((producto: IProducto) => [producto.slug, producto])
        ).values()
      ];
      console.log(productos);
    } else {
      error = respuesta.msg;
    }
  }
  catch (error) {
    console.log(error);
    error = "Error cargando productos";
  }
  return (
    <div className="">
      <ImageBanner />
      <div className="relative flex justify-center h-[85vh] mt-[-28vh] z-10">
        {error && <p className="text-red-500">{error}</p>}
        <div className="w-[75vw] grid grid-cols-4 grid-rows-2 gap-4">
          {
            productos.map((producto, index) => (
              <Producto key={ index } producto = { producto }/>
            ))
          }
        </div>
      </div>
    </div>
  );
}