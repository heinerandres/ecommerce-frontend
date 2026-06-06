

interface Cart {
  img: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

type Props = {
    cart: Cart;
    index: number;
}

export default function CheckCart({ cart, index }:Props) {
  return (
    <div className="flex h-[25%] p-3">
        <img 
          src={ cart.img }
          className="h-full"
        />
        <div className="pl-6 w-full">
          <p className="font-bold md:mt-0 2xl:mt-4">{ cart.nombre }</p>
          <p className="md:mt-0 2xl:mt-4">{ `₡ ${cart.precio} x 3` }</p>
          <p className="font-bold md:mt-1 2xl:mt-4">Subtotal: ${ cart.precio * 3}</p>
        </div>
    </div>
  )
}
