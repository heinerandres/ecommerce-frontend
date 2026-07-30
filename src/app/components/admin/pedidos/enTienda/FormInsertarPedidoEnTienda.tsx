'use client';
import { insertarColor } from "@/src/services/api/server/colores";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { IProducto } from "@/src/interfaces/producto";
import TablaProductos from "./tablasInsertar/tablaProductos/TablaProductos";
import TablaPedido from "./tablasInsertar/tablaPedido/TablaPedido";
import { IPedidoNuevo } from "@/src/interfaces/pedidoNuevo";
import { currencyFormat } from '../../../../../utilities/currencyFormat';
import Swal from "sweetalert2";
import { colocarPedidoEnTienda } from "@/src/services/api/server/pedidos";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

type Props = {
    productos: IProducto[] | null;
}

export default function FormInsertarPedidoEnTienda({productos}: Props) {
    const usuario = useSelector((state: RootState) => state.user);
    const { checking } = useSelector((state: RootState) => state.user);

    //redirigir
    useEffect(() => {
        if(checking) return;
        if (!usuario.uid) {
            router.push("/auth/login");
        }
    }, [usuario, checking]);


    const [globalFilter, setGlobalFilter] = useState("");
    const [pedidoNuevo, setPedidoNuevo] = useState<IPedidoNuevo>({
        _id: "",
        usuario_id: "",
        tipoPedido: "EnTienda",
        estaPago: true,
        estado: "Entregado",
        total: 0,
        productos: [],
    });
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const agregarProducto = (producto: IProducto) => {
        setPedidoNuevo(prev => {
            const existe = prev.productos.some(
                p =>
                    p.id._id === producto._id &&
                    (p.variante?._id ?? null) === (producto.variantes?.[0]?._id ?? null)
            );

            if(existe){
                
                return prev;
            }
            const tieneVariantes = producto.variantes?.length ?? 0 > 0;
            const precio = tieneVariantes
                ? producto.variantes?.[0].precio
                : producto.precio;
            const subtotal = tieneVariantes ? producto.variantes?.[0].precio : producto.precio;
            const productos = [
                ...prev.productos,
                {
                    id: producto,
                    variante: producto.variantes?.[0] ?? null,
                    cantidad: 1,
                    precioUnitario: precio ?? 0,
                    subtotal: subtotal ?? 0,
                }
            ];
            return {
                ...prev, 
                productos,
                total: productos.reduce((acc, p) => acc + p.subtotal , 0)
            };
        });
    };

    const actualizarCantidad = (idProducto: string, idVariante: string | null, cantidad: number) => {
        setPedidoNuevo(prev => {
            const productos = prev.productos.map(p => {
                if (
                    p.id._id === idProducto &&
                    (p.variante?._id ?? null) === idVariante
                ) {
                    // Stock disponible según si tiene variante o no
                    const stockDisponible =
                        p.variante != null
                            ? (p.variante.cantidad ?? 0)
                            : (p.id.cantidad ?? 0);

                    // No permitir cantidades menores a 1
                    if (cantidad < 1) {
                        cantidad = 1;
                    }

                    // No permitir cantidades mayores al stock
                    if (cantidad > stockDisponible) {
                        cantidad = stockDisponible;
                    }

                    return {
                        ...p,
                        cantidad,
                        subtotal: p.precioUnitario * cantidad
                    };
                }

                return p;
            });

            return {
                ...prev,
                productos,
                total: productos.reduce((acc, p) => acc + p.subtotal, 0)
            };
        });
    };
    

    const limpiarPedido = () => {
        setPedidoNuevo(({
            _id: "",
            usuario_id: "",
            tipoPedido: "EnTienda",
            estaPago: true,
            estado: "Entregado",
            total: 0,
            productos: [],
        }));
    }

    const eliminarProducto = ( idProducto: string, idVariante: string | null ) => {
        setPedidoNuevo(prev => {
            const productos = prev.productos.filter(
                p =>
                    !(
                        p.id._id === idProducto &&
                        (p.variante?._id ?? null) === idVariante
                    )
            );

            return {
                ...prev,
                productos,
                total: productos.reduce((acc, p) => acc + p.subtotal, 0)
            };
        });
    };

    const handleInsertar = async(e:any) => {
        e.preventDefault();
        if(pedidoNuevo.productos.length === 0){
            Swal.fire({
                icon: 'warning',
                title: 'Pedido vacío',
                text: 'Debe agregar al menos un producto antes de guardar el pedido.',
                confirmButtonText: 'Aceptar'
            });

            return;
        }
        
        pedidoNuevo.usuario_id = usuario.uid;
        const { _id,  ...pedidoSinId } = pedidoNuevo;
        const pedido = {
            ...pedidoSinId,
            productos: pedidoNuevo.productos.map(({ id, variante, cantidad, precioUnitario, subtotal }) => ({
                id: id._id,
                variante: variante?._id ?? null,
                cantidad,
                precioUnitario,
                subtotal
            }))
        }
        const respuestaPedido = await colocarPedidoEnTienda({pedido});
        console.log(respuestaPedido);
        if (respuestaPedido.ok) router.push('/admin/pedidos/entienda');
        else setErrorMsg(respuestaPedido.msg);
    }

    return (
        <div className="px-10 w-full">
            <div className="flex justify-between w-full h-fit">
                <div className="flex items-stretch ">
                    <div className="flex items-center px-6 bg-blue-200 rounded-xl">
                        <i className="fa-solid fa-store text-xl text-blue-700"></i>
                    </div>
                    <div className="ml-4">
                        <h5 className="text-2xl font-semibold">Pedido Nuevo</h5>
                        <h3 className="text-gray-400">Gestiona los productos disponibles en tu tienda.</h3>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <p><span className="font-semibold">Subtotal:</span> {currencyFormat(pedidoNuevo.total)}</p>
                    <button onClick={limpiarPedido} className="h-full border text-blue-400 font-semibold rounded-xl px-4 cursor-pointer">
                        <i className="fa-solid fa-broom mr-2"></i>
                        Limpiar pedido
                    </button>
                    <button onClick={handleInsertar} className="h-full border text-white bg-blue-700 font-semibold rounded-xl px-4 cursor-pointer">
                        <i className="fa-regular fa-save mr-2"></i>
                        Guardar Pedido
                    </button>
                </div>
                
            </div>
            <div className="mt-10">
                <TablaPedido pedidoNuevo={ pedidoNuevo ?? null } actualizarCantidad={actualizarCantidad} eliminarProducto={eliminarProducto}/>
            </div>
            <div className="mt-10">
                <div className="flex justify-between w-full h-fit mb-10">
                    <div className="flex items-stretch ">
                        <div className="flex items-center px-6 bg-blue-200 rounded-xl">
                            <i className="fa-solid fa-cart-plus text-xl text-blue-700"></i>
                        </div>
                        <div className="ml-4">
                            <h5 className="text-2xl font-semibold">Agregar Productos</h5>
                            <h3 className="text-gray-400">Agrega los pedidos del cliente.</h3>
                        </div>
                    </div>
                    <input
                        className="h-10 border border-gray-300 p-4 mb-5 rounded-md mr-20"
                        value={globalFilter}
                        onChange={(e)=>setGlobalFilter(e.target.value)}
                        placeholder="Buscar producto"
                    />
                </div>
                <TablaProductos productos={productos} agregarProducto={ agregarProducto } globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
            </div>
            
        </div>
    )
}