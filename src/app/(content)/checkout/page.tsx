
import Link from "next/link";
import CheckCart from "../../components/cart/CheckCart";

const Carts = [{
  img: "foto1.jpg",
  nombre: "Producto 1 ñalsdkfjañsdkfjañdsfljañsd",
  precio: 7500.9,
  cantidad: 5,
},{
  img: "foto1.jpg",
  nombre: "Producto 1",
  precio: 7500.9,
  cantidad: 5,
},{
  img: "foto1.jpg",
  nombre: "Producto 1",
  precio: 7500.9,
  cantidad: 5,
},]

export default function CheckoutPage() {
  return (
    <div className="flex justify-center h-[80vh] md:text-sm 2xl:text-lg">
        <div className="flex w-[60%]">
            <div className="w-[50%] p-[2%]">
                <h5 className="text-4xl font-bold">Verificar orden</h5>
                <div className="h-[65vh] mt-[2%] overflow-y-auto">
                    <p className="text-lg">Ajustar elementos</p>
                    <Link href="/cart" className="underline cursor-pointer">Editar carrito</Link>
                    {
                        Carts.map((cart, index) => (
                            <CheckCart key={index} cart = {cart} index = { index } />
                        ))
                    }
                </div>
            </div>
            <div className="md:w-[47%] 2xl:w-[35%] md:h-[85%] 2xl:h-[68%] mt-[5%] md:ml-[15%] 2xl:ml-[5%] p-8 rounded-2xl shadow-xl">
              <h4 className="text-xl font-bold">Dirección de entrega</h4>
              <div className="mb-4">
                <p className="">Heiner Andrés Solano Arguedas</p>
                <p>Heredia</p>
                <p>Dirección de entrega de la persona</p>
                <p>Dirección de entrega de la persona</p>
                <p>CP 123123</p>
                <p>+506 34534563</p>
              </div>
                    {/* linea divisoria */}
              <div className="w-full h-0.5 rounded bg-gray-200 mb-4"/>

              <h4 className="text-xl font-bold">Resumen de orden</h4>
              <div className="flex justify-between mt-4">
                <p>Número de productos</p>
                <p className="">3</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="">$100</p>
              </div>
              <div className="flex justify-between">
                <p>Impuestos (11%)</p>
                <p className="">$10</p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-xl font-bold">Total</p>
                <p className="text-xl font-bold">$110</p>
              </div>
              
              <div className="flex flex-col mt-4">
                <p className="mb-4">
                    <span className="text-xs">Al hacer click en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a></span>
                </p>
                <Link 
                href="/pedidos/123"
                className="text-center w-full py-2 bg-blue-500 text-white rounded cursor-pointer"
                >
                    Colocar orden
                </Link>
              </div>
              
            </div>
        </div>
    </div>
  )
}