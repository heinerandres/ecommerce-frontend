'use client';
import { RootState } from '@/src/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Cart from './Cart';
import { IProducto } from '@/src/interfaces/producto';
import { currencyFormat } from '@/src/utilities/currencyFormat';
import { obtenerProductosCarrito, removerProductoCarrito } from '@/src/services/api/server/carritos';
import { IVariante } from '@/src/interfaces/variante';

interface productoEnCarrito {
  cantidadCarrito: number,
  producto: IProducto,
  stock: number,
  variante?: IVariante,
}

export const CartClient = () => {
  const router = useRouter();
  const [productosEnCarrito, setProductosEnCarrito] = useState<productoEnCarrito[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  //redux, consultar si estoy logueado
  const usuario = useSelector((state: RootState) => state.user);
  const { checking } = useSelector((state: RootState) => state.user);

  //trae de la base de datos los productos, solo los que estan en el carrito
  const getProductosCarrito = async () => {
    const res = await obtenerProductosCarrito({usuarioId: usuario.uid});
    if(res.ok) setProductosEnCarrito(res.respuesta);
    else setErrorMsg(JSON.stringify(res));
  }
  //calcular subtotal
  const subtotal = productosEnCarrito.reduce((total, item) => {
    const precio = !item.variante
        ? item.producto.precio
        : item.variante.precio;

    return total + (precio ?? 0) * item.cantidadCarrito;
  }, 0);


  const actualizarCantidad = (
    productoId: string,
    nuevaCantidad: number
  ) => {
    setProductosEnCarrito((prev) =>
      prev.map((p) =>
        p.producto._id === productoId
          ? { ...p, cantidadCarrito: nuevaCantidad }
          : p
      )
    );
  };

  //redirigir
  useEffect(() => {
    if(checking) return;
    if (!usuario.uid) {
        router.push("/auth/login");
    }
    getProductosCarrito();
    console.log(productosEnCarrito);
   }, [usuario, checking]);

  //remover
  const handleRemover = async (productoId: string, varianteId: string | undefined) => {
    const res = await removerProductoCarrito({usuarioId: usuario.uid, productoId, varianteId});
    if(!res.ok) setErrorMsg(JSON.stringify(res));
    getProductosCarrito();
  }

  return (
    <div className="flex w-[60%]">
        <div className="w-[50%] p-[2%]">
          <h5 className="text-4xl font-bold">Carrito</h5>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <div className="h-[65vh] mt-[2%] overflow-y-auto">
              <p className="text-lg">Agregar más items</p>
              <Link href="/" className="underline cursor-pointer">Continuar comprando</Link>

              {
                productosEnCarrito.map((productoEnCarrito, index) => {
                  return(
                    <Cart
                      key={index}
                      usuario={usuario.uid}
                      productoEnCarrito={productoEnCarrito}
                      _actualizarCantidad={actualizarCantidad}
                      handleRemover={handleRemover}
                    />
                  );
                })
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
