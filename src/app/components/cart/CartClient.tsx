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
    <div className="flex gap-15 w-[90%]">
        <div className="w-[62%] p-[2%]">
          <h5 className="text-3xl 2xl:text-4xl font-bold">Carrito</h5>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <p className="text-base 2xl:text-sm mt-2 text-gray-500">Reviza los productos antes de continuar con la compra.</p>

          <div className="h-[65vh] mt-[2%] overflow-y-auto">
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
              <div className="flex text-sm p-3 shadow-md">
                <div className="flex items-center gap-4">
                  <i className="shrink-0 h-fit fa-solid text-yellow-300 fa-bag-shopping p-4 2xl:p-4 bg-yellow-100 rounded-full"></i>
                  <div>
                    <p className="font-bold">¿Te hace falta algo más?</p>
                    <p className="text-gray-700">Explora nuestros productos y encuentra más opciones</p>
                  </div>
                </div>
                  <Link href="/" 
                    className="flex items-center px-3 text-xs 2xl:text-base cursor-pointer ml-auto border border-gray-400 rounded-lg"
                    >
                  Continuar comprando
                  </Link>
              </div>
          </div>
        </div>
        <div className="md:w-[35%] 2xl:w-[24%]">
          <div className=" mt-20 p-8 rounded-2xl shadow-md">
            <h4 className="text-xl font-bold">Resumen de orden</h4>
            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-box"></i>
                <p>Número de productos ({productosEnCarrito?.length})</p>
              </div>
              <p className="">{currencyFormat(subtotal)}</p>
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-tag"></i>
                <p>Impuestos(11%)</p>
              </div>
              <p className="">{currencyFormat(subtotal * 0.11)}</p>
            </div>
            <div className="flex justify-between mt-4 pt-2 border-t border-gray-300">
              <p className="text-xl font-bold">Total</p>
              <p className="text-xl font-bold">{currencyFormat(subtotal * 1.11)}</p>
            </div>
            <div className="flex items-center gap-4 pl-7 p-3 bg-green-100 text-sm border border-green-300 rounded-lg mt-4">
              <i className="fa-solid fa-truck"></i>
              <div>
                <p className="font-semibold">¡Envio gratis aplicado!</p>
                <p className="">Disfruta de envio gratis en tu pedido</p>
              </div>
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
          <div className="mt-5 text-sm shadow-md rounded-lg">
            <div className="flex gap-4 items-center flex-row mx-5 px-5 py-2 border-b border-gray-200">
              <i className="shrink-0 h-fit fa-solid fa-shield-heart p-4 2xl:p-4 text-green-500 bg-green-200 rounded-full"></i>
              <div className="h-fit">
                <p className="font-semibold">Compra segura</p>
                <p className="text-gray-600">Tus pagos están protegidos con encriptación</p>
              </div>
            </div>
            <div className="flex gap-4 items-center flex-row mx-5 px-5 py-2 border-b border-gray-200">
              <i className="shrink-0 h-fit fa-solid fa-truck p-4 2xl:p-4 text-purple-500 bg-purple-200 rounded-full"></i>
              <div className="h-fit">
                <p className="font-semibold">Envio rápido y gratis</p>
                <p className="text-gray-600">En pedidos mayores a $15.000 en todo Costa Rica</p>
              </div>
            </div>
            <div className="flex gap-4 items-center flex-row mx-5 px-5 py-2 border-b border-gray-200">
              <i className="shrink-0 h-fit fa-solid fa-rotate p-4 2xl:p-4 text-yellow-500 bg-yellow-200 rounded-full"></i>
              <div className="h-fit">
                <p className="font-semibold">Devoluciones fáciles</p>
                <p className="text-gray-600">Tienes 30 días para cambios o devoluciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
