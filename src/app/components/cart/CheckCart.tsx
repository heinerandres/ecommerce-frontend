import { IProducto } from "@/src/interfaces/producto";
import { IVariante } from "@/src/interfaces/variante";
import { currencyFormat } from "@/src/utilities/currencyFormat";
import { _base } from "@/src/utilities/url-imgBase";


interface productoEnCarrito {
  cantidadCarrito: number,
  producto: IProducto,
  stock: number,
  variante?: IVariante,
}

type Props = {
    producto: productoEnCarrito;
}

export default function CheckCart({ producto }:Props) {
  const base = _base;
  const precio = !producto.variante ? producto.producto.precio : producto.variante.precio;
  

  return (
    <div className="shadow-md border border-gray-300 my-3 rounded-xl">
      <div className="flex p-3">
        <div className="w-40 2xl:w-45 border">
          <img 
            src={ base + producto.producto.imagenes?.[0].url }
            className="h-full"
          />
        </div>
        <div className="relative flex flex-col justify-between p-0 pl-6 w-full">
          <div className="flex justify-between">
            <p className="font-bold">{ producto.producto.nombre }</p>
            
          </div>
          {
            producto.variante ? (
              <>
                <p className="font-bold text-base">{ currencyFormat(producto.variante.precio ?? 0) }</p>
                <div className="flex gap-2 text-sm">
                  <div className="bg-gray-100 p-2 rounded-lg flex items-center">
                    <div className="border w-4 h-4 rounded-full mr-2" style={{backgroundColor: producto.variante.color.valor}}></div>
                    <span className="font-semibold mr-1">Color: </span>{ producto.variante.color.nombre }
                  </div>
                  <p className="bg-gray-100 p-2 rounded-lg"><span className="font-semibold">Talla: </span>{ producto.variante.talla.valor }</p> 
                </div>
              </>
            ) : (
              <p className="font-bold text-base">{ currencyFormat(producto.producto.precio ?? 0) }</p>
            )
          }
          <div className="flex flex-row justify-between pt-3">
            <p className=" shrink-0 h-fit p-1 px-3 rounded-lg xl:text-sm 2xl:text-base text-green-400 bg-green-100"><i className="fa-solid fa-check mr-2"></i>Disponibles</p>
            <div className="flex gap-10 items-center self-end">
              <div className="flex flex-col items-center">
                <h3 className="text-sm">Cantidad</h3>
                <span className="w-12 text-center xl:py-1 2xl:py-0">{producto.cantidadCarrito}</span>
              </div>
              <div>
                <p className="text-sm">Subtotal</p>
              <p className="font-semibold">{ currencyFormat(producto.producto.precio ? producto.producto.precio * producto.cantidadCarrito : (producto.variante?.precio ?? 0) * producto.cantidadCarrito)}</p>
              </div>
            </div>
            

          </div>
          
        </div>
    </div>

    </div>
    
  )
}
