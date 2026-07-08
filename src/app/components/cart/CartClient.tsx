'use client';
import { RootState } from '@/src/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Cart from './Cart';
import { IProducto } from '@/src/interfaces/producto';
import { currencyFormat } from '@/src/utilities/currencyFormat';
import { obtenerProductosCarrito } from '@/src/services/api/server/carritos';

type Props = {
  tallas: {_id: string, valor:string}[] | null,
  colores: {_id: string,nombre:string, valor:string}[] | null,
}

export const CartClient = ({ tallas, colores }: Props) => {
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(0);
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  //redux, consultar si estoy logueado
  const usuario = useSelector((state: RootState) => state.user);
  const { checking } = useSelector((state: RootState) => state.user);
  const carrito = useSelector((state: RootState) => state.carrito.carrito);

  //productos
  //variantes

  const productosCarrito = async () => {
    try {
        const idsProductos = carrito.productos.map(p => p.id);
        console.log(idsProductos);
        const res = await obtenerProductosCarrito({idsProductos});
        console.log(res);
        if(res.ok) setProductosEnCarrito(res.productos);
        else setErrorMsg(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
  }

  //redirigir
  useEffect(() => {
    if(checking) return;
    if (!usuario.uid) {
        router.push("/auth/login");
    }
    productosCarrito();
    console.log(productosEnCarrito);
   }, [usuario, checking]);

  //consultar productos del carrito
   //carrito.productos
  

  //calcular subtotal
  

  //remover

  //sumar duplicados al agregar
  
  //guardar los cambios del carro cuando avance o cuando de click en continuar comprando

  return (
    <div className="flex w-[60%]">
        <div className="w-[50%] p-[2%]">
          <h5 className="text-4xl font-bold">Carrito</h5>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <div className="h-[65vh] mt-[2%] overflow-y-auto">
              <p className="text-lg">Agregar más items</p>
              <Link href="/" className="underline cursor-pointer">Continuar comprando</Link>
              {

                  /* cartProducts?.map((producto: IProducto, index) => (
                      <Cart key={index}  
                      producto={producto} 
                      setSubtotal={setSubtotal} 
                      tallas={tallas} 
                      colores={colores} />
                  )) */
              }
          </div>
        </div>
        <div className="md:w-[45%] 2xl:w-[35%] md:h-[50%] 2xl:h-[40%] mt-[5%] ml-[5%] p-8 rounded-2xl shadow-xl">
          <h4 className="text-xl font-bold">Resumen de orden</h4>
          <div className="flex justify-between mt-4">
            <p>Número de productos</p>
            {/* <p className="">{ cartProducts?.length }</p> */}
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="">{currencyFormat(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p>Impuestos(11%)</p>
            <p className="">{currencyFormat(subtotal * 0.11)}</p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold">{currencyFormat(subtotal * 1.11)}</p>
          </div>
          <div className="flex flex-col">
            <Link 
              href="/checkout/address" 
              className="w-full mt-[8%] text-center py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Checkout
            </Link>
          </div>
          
        </div>
      </div>
  )
}
