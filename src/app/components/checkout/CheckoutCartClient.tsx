'use client';
import Link from "next/link"
import CheckCart from "../cart/CheckCart";
import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { obtenerProductosCarrito } from "@/src/services/api/server/carritos";
import { colocarOrden } from "@/src/services/api/server/pedidos";
import { IProducto } from "@/src/interfaces/producto";
import { IVariante } from "@/src/interfaces/variante";
import { obtenerDireccion } from "@/src/services/api/server/direccion";
import { currencyFormat } from "@/src/utilities/currencyFormat";

interface productoEnCarrito {
  cantidadCarrito: number,
  producto: IProducto,
  stock: number,
  variante?: IVariante,
}

export const CheckoutCartClient = () => {
    const router = useRouter();
    const usuario = useSelector((state: RootState) => state.user);
    const carrito = useSelector((state: RootState) => state.carrito.carrito);

    const { checking } = useSelector((state: RootState) => state.user);
    const [productosEnCarrito, setProductosEnCarrito] = useState<productoEnCarrito[]>([]);
    //estados de la direccion
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direccion2, setDireccion2] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [telefono, setTelefono] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    //trae de la base de datos los productos, solo los que estan en el carrito
    const getProductosCarrito = async () => {
        const res = await obtenerProductosCarrito({usuarioId: usuario.uid});
        console.log(res);
        if(res.ok) setProductosEnCarrito(res.respuesta);
        else setErrorMsg(JSON.stringify(res));
    }
    const getDireccion = async () => {
        const respuesta = await obtenerDireccion({carrito: carrito._id});
        if(respuesta.ok){
            const direccion = respuesta.direccion;
            setNombres(direccion.nombres);
            setApellidos(direccion.apellidos);
            setDireccion(direccion.direccion);
            setDireccion2(direccion.direccion2);
            setCodigoPostal(direccion.codigoPostal);
            setCiudad(direccion.ciudad);
            setPais(direccion.pais);
            setTelefono(direccion.telefono);
        }
        else setErrorMsg(JSON.stringify(respuesta));
    }

    //redirigir
    useEffect(() => {
    if(checking) return;
    if (!usuario.uid) {
        router.push("/auth/login");
    }
    getProductosCarrito();
    getDireccion();
    console.log(productosEnCarrito);
    }, [usuario, checking]);

    const subtotal = productosEnCarrito.reduce(
        (total, item) =>
            total +
            (item.variante?.precio ?? item.producto.precio ?? 0) *
            item.cantidadCarrito,
        0
    );


    const handleColocarOrden = async () => {
        const res = await colocarOrden({IdCarrito: carrito._id});
        console.log(res);
        if(res.ok) router.push('pedidos/')
        else setErrorMsg(JSON.stringify(res));
    }

    return (
        <div className="flex lg:w-[90%] 2xl:w-[60%]">
            <div className="w-[50%] p-[2%]">
                <h5 className="xl:text-2xl 2xl:text-4xl font-bold">Verificar orden</h5>
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                <div className="h-[65vh] mt-[2%] overflow-y-auto">
                    <p className="xl:text-base 2xl:text-lg">Ajustar elementos</p>
                    <Link href="/cart" className="xl:text-xs 2xl:text-base underline cursor-pointer">Editar carrito</Link>
                    {
                        productosEnCarrito.map((producto, index) => (
                            <CheckCart key={index} producto={producto} />
                        ))
                    }
                </div>
            </div>
            <div className="md:w-[47%] 2xl:w-[35%] mt-[5%] h-fit md:ml-[15%] 2xl:ml-[5%] p-8 rounded-2xl shadow-xl">
              <h4 className="text-xl font-bold">Información de entrega</h4>
              <div className="mb-4">
                <p className="">{nombres + " " + apellidos}</p>
                <div className="flex flex-row gap-2">
                    <p>{ciudad + ","}</p>  
                    <p>{pais}</p>
                </div>
                <p>{direccion}</p>
                <p>{direccion2}</p>
                <p>{codigoPostal}</p>
                <div className="flex justify-between">
                    <div>
                        <p>+(506) {telefono}</p>
                    </div>
                    <Link href={"/checkout/address"} className="underline mr-7">Editar</Link>
                </div>
              </div>
                    {/* linea divisoria */}
              <div className="w-full h-0.5 rounded bg-gray-200 mb-4"/>

              <h4 className="text-xl font-bold">Resumen de orden</h4>
              <div className="flex justify-between mt-4">
                <p>Número de productos</p>
                <p className="">{productosEnCarrito.length}</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="">{currencyFormat(subtotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Impuestos (11%)</p>
                <p className="">$10</p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-xl font-bold">Total</p>
                <p className="text-xl font-bold">{currencyFormat(subtotal * 1.11)}</p>
              </div>
              
              <div className="flex flex-col mt-4">
                <p className="mb-4">
                    <span className="text-xs">Al hacer click en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a></span>
                </p>
                <button 
                    onClick={handleColocarOrden}
                    className="text-center w-full py-2 bg-blue-500 text-white rounded cursor-pointer"
                    >
                        Colocar orden
                </button>
              </div>
              
            </div>
        </div>
    )
}

