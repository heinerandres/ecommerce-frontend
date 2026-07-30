import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { IPedido } from "@/src/interfaces/pedido";
import { currencyFormat } from '../../../../../../utilities/currencyFormat';

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const estados = [
    "Pendiente",
    "Enviado",
];


export const PedidosColumns = (
    cambiarEstado: (idPedido: string, estado: string) => void
): ColumnDef<IPedido>[] => [
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
        cell: ({ row }) => (
            <>
                <p className="bg-blue-200 w-fit p-3 rounded-lg text-blue-500">
                    <i className="fa-solid fa-gift mr-2"></i>
                    {row.original.estado}
                </p>
            </>
        )
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
            <p className="border w-fit px-4 py-2 rounded-lg cursor-pointer">Detalles</p>
        ),
    },
];