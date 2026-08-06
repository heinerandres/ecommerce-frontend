import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { IPedido } from "@/src/interfaces/pedido";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { currencyFormat } from "@/src/utilities/currencyFormat";

const estados = [
    "Pendiente",
    "Enviado",
];


export const PedidosColumns = (): ColumnDef<IPedido>[] => [
    
    {
        id: "cliente",
        header: () => <>Cliente</>,
        cell: ({ row }) => {
            if (!row.original.direccion_id) return null;

            return (
                <>
                    <p className="font-semibold">
                        {row.original.direccion_id.nombres} {row.original.direccion_id.apellidos}
                    </p>
                    <p className="font-semibold text-gray-600">
                        (+506) {row.original.direccion_id.telefono}
                    </p>
                </>
            );
        },
    },
    {
        accessorKey: "fecha",
        id: "fecha",
        header: () => <>Fecha</>,
        cell: ({ getValue }) => {
            const fecha = new Date(getValue<string>());

            const fechaTexto = fecha.toLocaleDateString("es-CR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            const horaTexto = fecha.toLocaleTimeString("es-CR", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });

            return (
                <div className="flex flex-col">
                    <span>{fechaTexto}</span>
                    <span className="text-xs">{horaTexto}</span>
                </div>
            );
        }
    },
    {
        id: "estado",
        header: () => <>Estado</>,
        cell: ({ row }) => {

            const pedido = row.original;
            return (
                    <button
                        className={`
                            w-fit px-4 py-2 rounded-lg 
                            flex items-center gap-2
                            cursor-pointer
                            ${
                                pedido.estado === "Pendiente"
                                    ? "bg-amber-100 text-amber-500"
                                    : pedido.estado === "Enviado"
                                    ? "bg-blue-100 text-blue-500"
                                    : pedido.estado === "Entregado"
                                    ? "bg-green-100 text-green-500"
                                    : "bg-gray-100 text-gray-500"
                            }
                        `}
                    >
                        <i className="fa-solid fa-gift"></i>
                        {pedido.estado}
                    </button>
                
        );
            
        
        }
    },
    {
        accessorFn: row => currencyFormat(row.total),
        id: "total",
        header: () => <>Total</>
    },
    {
        id: "estaPago",
        header: () => (<>Pago</>),
        cell: ({ row }) => (
            <>
            { row.original.estaPago ? <div><p className="border w-fit p-2 rounded-lg bg-green-100 text-green-600 font-semibold"><i className="fa-solid fa-check mr-2"></i>Pago</p></div> : <div><p className=" w-fit px-3 py-2 rounded-lg bg-red-100 text-red-400 font-semibold"><i className="fa-solid fa-xmark mr-2"></i> No pagado</p></div>}
            </>
        ),
    },
    {
        id: "detalle",
        header: () => (<>Detalles</>),
        cell: ({ row }) => (
            <div className="flex gap-5">
                <p className="border w-fit px-4 py-2 rounded-lg cursor-pointer">Detalles</p>
                <p className="border w-fit px-4 py-2 rounded-lg cursor-pointer">Pagar</p>
            </div>
            
        ),
    },
];