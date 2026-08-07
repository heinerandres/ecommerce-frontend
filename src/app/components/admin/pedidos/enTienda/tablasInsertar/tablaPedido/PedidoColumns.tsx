import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { IProducto } from "@/src/interfaces/producto";
import { IProductoPedido } from "@/src/interfaces/productoPedido";
import { _base } from "@/src/utilities/url-imgBase";

const base = _base;

export const PedidoColumns = (
    actualizarCantidad: (idProducto: string, idVariante: string | null, cantidad: number) => void,
    eliminarProducto: ( idProducto: string, idVariante: string | null ) => void,
): ColumnDef<IProductoPedido>[] => [
    {
        id: "producto",
        accessorKey:"nombre",
        header: () => (<>Producto</>),
        cell: ({ row }) => (
            <div className="flex gap-5">
                <img className="w-20 h-20 shadow-sm" src={base + row.original.id.imagenes?.[0].url}></img>
                <div className=" flex flex-col gap-3">
                    <p className="font-semibold">{row.original.id.nombre}</p>
                    <p className="text-gray-500">slug: {row.original.id.slug}</p>
                </div>
            </div>
        ),
    },
    {
        id:"precio",
        header: () => (<>Precio</>),
        cell: ({ row }) => {
            const producto = row.original.id;
            if (!producto.variantes || producto.variantes.length === 0) {
                return <>₡{producto.precio?.toLocaleString()}</>;
            }
            const precios = producto.variantes.map(v => v.precio);
            const min = Math.min(...precios);
            const max = Math.max(...precios);

            return (
                <>
                    {min === max
                        ? `₡${min.toLocaleString()}`
                        : `₡${min.toLocaleString()} - ₡${max.toLocaleString()}`
                    }
                </>
            );
        },
    },
    {
        id: "disponibles",
        header: () => <>Disponibles</>,
        cell: ({ row }) => {
            const producto = row.original.id;
            if (!producto.variantes || producto.variantes.length === 0) {
                return <p className="text-green-500 font-semibold">{producto.cantidad} disponibles</p>;
            }
            const cantidadTotal = producto.variantes.reduce(
                (total, variante) => total + variante.cantidad,
                0
            );
            return <p className="text-green-500 font-semibold">{cantidadTotal} disponibles</p>;
        },
    },
    {
        id: "cantidad",
        header: "Cantidad",
        cell: ({ row }) =>
            (row.original.id.variantes?.length ?? 0) === 0 ? (
                <div className="inline-block">
                    <input
                        className="border w-15 p-1"
                        name="cantidad"
                        type="number"
                        value={row.original.cantidad}
                        onChange={(e) => actualizarCantidad(row.original.id._id, null, Number(e.target.value))}
                    >
                    </input>
                </div>
                
            ) : null,
    },
    {
        id: "expand",
        header: "Acciones",
        cell: ({ row }) =>
            (row.original.id.variantes?.length ?? 0) > 0 ? (
                <button
                    className="cursor-pointer border p-3 rounded-lg"
                    onClick={row.getToggleExpandedHandler()}
                >
                    <i
                        className={`fa-solid fa-chevron-right transition-transform duration-300 mr-2 ${
                            row.getIsExpanded() ? "rotate-90" : ""
                        }`}
                    />Ver Variantes
                </button>
            ) : 
                <button onClick={() => eliminarProducto(row.original.id._id, null)} className="border p-2 rounded-lg cursor-pointer">
                    Eliminar
                </button>,
    }
];