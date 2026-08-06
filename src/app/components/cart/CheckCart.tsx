import { IProducto } from "@/src/interfaces/producto";
import { IVariante } from "@/src/interfaces/variante";


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
  const base = "http://localhost:4000/uploads/";
  const precio = !producto.variante ? producto.producto.precio : producto.variante.precio;
  

  return (
    <div className="flex h-[25%] p-3">
        <img 
          src={ base + producto.producto.imagenes?.[0].url }
          className="h-full"
        />
        <div className="pl-6 w-full">
          <p className="font-bold md:mt-0 2xl:mt-4">{ producto.producto.nombre }</p>
          <p className="md:mt-0 2xl:mt-4">{ `₡ ${precio} x ${producto.cantidadCarrito}` }</p>
          <p className="font-bold md:mt-1 2xl:mt-4">Subtotal: ${ (precio ?? 0) * (producto.cantidadCarrito ?? 0)}</p>
        </div>
    </div>
  )
}
