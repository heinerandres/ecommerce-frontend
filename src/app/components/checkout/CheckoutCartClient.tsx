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
import StepProgress, { Step } from "../main/StepProgress";

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
        <div className="flex flex-col items-center w-full"> 
            <div className="flex items-center justify-center w-full mb-7 mt-7">
                <div className="w-[70%]">
                    <StepProgress currentStep={Step.verificarOrden} />
                </div>
            </div>
            <div className="flex gap-15 w-[90%]">
                
                <div className="w-[62%] p-[2%] border border-gray-200 rounded-lg shadow-sm">
                    <h5 className="xl:text-2xl 2xl:text-3xl font-bold">Verifica tu orden</h5>
                    <p className="text-base 2xl:text-sm mt-2 text-gray-500">Reviza los productos, cantidades y detalles de entrega antes de continuar.</p>
                    {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                    <div className="h-[65vh] mt-[2%] overflow-y-auto">
                        <Link href="/cart" className="xl:text-xs 2xl:text-base underline cursor-pointer">Editar carrito</Link>
                        {
                            productosEnCarrito.map((producto, index) => (
                                <CheckCart key={index} producto={producto} />
                            ))
                        }
                    </div>
                    <div className="flex items-center gap-3 mt-5 p-3 border border-gray-200 rounded-lg">
                        <i className="fa-solid fa-shield-heart text-blue-500 bg-blue-200 p-3 rounded-full"></i>
                        <div>
                            <p className="text-sm font-semibold">Todo listo para tu compra</p>
                            <p className="text-sm text-gray-500">Reviza que los productos y la información para tu entrega esten correctos.</p>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5">
                        <Link 
                            href="" 
                            className="flex items-center gap-2 border border-gray-300 text-base p-2 rounded-lg">
                                <i className="fa-solid fa-arrow-left text-sm mt-0.5"></i>
                                Volver a Dirección
                        </Link>
                        <button  
                            onClick={handleColocarOrden}
                            className="flex gap-4 items-center text-base p-2 px-10 rounded-lg text-white bg-blue-500">
                                Continuar a generar pedido
                                <i className="fa-solid fa-arrow-right text-sm mt-1"></i>
                        </button>

                    </div>
                </div>


                <div className="md:w-[35%] 2xl:w-[24%]">
                    <div className="p-8 rounded-lg shadow-sm border border-gray-200">
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
                    </div>
                    <div className="mt-10 p-8 rounded-lg shadow-sm border border-gray-200 text-base">
                        <h4 className="text-xl font-bold">Información de entrega</h4>
                        <div className="mt-3 border-b border-gray-300 pb-3">
                            <p><i className="fa-solid fa-location-dot mr-2 text-sm"></i>{ciudad}, {pais}</p>  
                            <p>{direccion}, {codigoPostal}</p>
                            <p>{direccion2}</p>
                            <p><i className="fa-solid fa-phone mr-1 text-sm"></i>+(506) {telefono}</p>
                            <div className="flex justify-between">
                                <p>{nombres} {apellidos}</p>
                                <Link href={"/checkout/address"} className="underline mr-7">Editar</Link>
                            </div>
                        </div>
                        <p className="mt-4">Método de envío</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm">
                                <i className="fa-solid fa-truck text-sm"></i>
                                <div>
                                    <p className="font-semibold">Uber Flash</p>
                                    <p className="text-gray-500">Entrega rápida y segura el mismo día</p>
                                </div>
                            </div>
                            <p>$2.500,00</p>
                        </div>
                    </div>

                    <div className="mt-10 p-5 rounded-lg shadow-sm border border-gray-200 text-sm">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-lock text-base"></i>
                            <div>
                                <p className="font-semibold">Compra segura</p>
                                <p className="text-gray-500">Tus pagos están protegidos con encriptación SSL</p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-2">
                            
                            <img src="/visa.jpg" className="w-10"/>
                            <img src="/mastercard.ico" className="w-10"/>
                            <img src="/applepay.png" className="w-10"/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

