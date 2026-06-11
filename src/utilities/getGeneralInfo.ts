import { IProducto } from "../interfaces/producto";
import { getColores } from "../services/api/server/colores";
import { getProductoBySlug, getProductos } from "../services/api/server/productos";
import { getTallas } from "../services/api/server/tallas";

export const getGeneralInformation = async(slug: string | null = null) => {
  let productos: IProducto[] | null = [];
  let tallas: {_id: string, valor:string}[] | null = null;
  let colores: {_id: string, nombre:string, valor:string}[] | null = null;
  let errorMsg = null;

  try {
    if(slug){
      const respuestaProductos = await getProductoBySlug(slug);

      if (respuestaProductos.ok) productos = respuestaProductos.producto;
      else errorMsg = respuestaProductos.msg;
    }
    else{
      const respuestaProductos = await getProductos();
      if (respuestaProductos.ok) productos = respuestaProductos.productos;
      else errorMsg = respuestaProductos.msg;
    }
    
    //consoltar tallas
    const respuestaTallas = await getTallas();

    if (respuestaTallas.ok) tallas = respuestaTallas.tallas;
    else errorMsg = respuestaTallas.msg;
    //consultar colores
    const respuestaColor = await getColores();

    if (respuestaColor.ok) colores = respuestaColor.colores;
    else errorMsg = respuestaColor.msg;
  }
  catch (error) {
    console.log(error);
    errorMsg = "Error de comunicación con la base de datos";
  }
  return {
    productos,
    tallas,
    colores,
    errorMsg
  }
}

