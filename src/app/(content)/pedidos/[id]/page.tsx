
import Link from "next/link";
import clsx from 'clsx';
import CheckCart from "@/src/app/components/cart/CheckCart";

const Carts = [{
   img: "/foto1.jpg",
  nombre: "Producto 1 ñalsdkfjañsdkfjañdsfljañsd",
  precio: 7500.9,
  cantidad: 5,
},{
  img: "/foto2.jpg",
  nombre: "Producto 1",
  precio: 7500.9,
  cantidad: 5,
},{
  img: "/camiseta-copia.PNG",
  nombre: "Producto 1",
  precio: 7500.9,
  cantidad: 5,
},]

interface Props {
    params: {
        id: string;
    }
}

export default async function OrdersPage( { params }: Props ) {
    const _params = await params;

  return (
    <div className="flex justify-center h-[80vh]">
        <div className="flex w-[60%]">
            <div className="w-[50%] p-[2%]">
                <h5 className="text-4xl font-bold">Orden { _params.id }</h5>
                <div className="h-[65vh] mt-[2%] overflow-y-auto">
                    <div className={
                        clsx(
                            "flex items-center rounded-lg py-3 px-3.5 text-base font-bold text-white mb-5",
                            {
                                'bg-red-500': false,
                                'bg-green-700': true,
                            }
                        )
                    }>
                        <i className="fa-solid fa-credit-card"></i>
                        <span className="mx-2">Pagada</span>

                    </div>


                    {
                        Carts.map((cart, index) => (
                            <CheckCart key={index} cart = {cart} index = { index } />
                        ))
                    }
                </div>
            </div>
            <div className="w-[35%] h-[68%] mt-[5%] ml-[5%] p-8 rounded-2xl shadow-xl">
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

                <div className={
                    clsx(
                        "flex items-center rounded-lg py-3 px-3.5 text-base font-bold text-white mb-5",
                        {
                            'bg-red-500': false,
                            'bg-green-700': true,
                        }
                    )
                }>
                    <i className="fa-solid fa-credit-card"></i>
                    <span className="mx-2">Pagada</span>

                </div>
              </div>
            </div>
        </div>
    </div>
  )
}