'use client';

import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, getFilteredRowModel } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { IPedido } from "@/src/interfaces/pedido";
import { PedidosColumns } from "./PedidosColumns";
import { useRouter } from "next/navigation";
import { actualizarEstadoPedido, getPedidosCliente } from '@/src/services/api/server/pedidos';
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";


export default function TablaPedidosCliente() {

    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    //redux, consultar si estoy logueado
    const usuario = useSelector((state: RootState) => state.user);
    const { checking } = useSelector((state: RootState) => state.user);

    const getPedidos = async () => {
        const res = await getPedidosCliente({usuario_id: usuario.uid});
        if(res.ok) setPedidos(res.pedidos.filter( (pedido: IPedido) => pedido.tipoPedido === "EnPagina" ));
        else setErrorMsg(JSON.stringify(res));
    }

    //redirigir
    useEffect(() => {
        if(checking) return;
        if (!usuario.uid) {
            router.push("/auth/login");
        }
        getPedidos();
    }, [usuario, checking]);

    const table = useReactTable({
        data: pedidos ?? [],
        columns: PedidosColumns(),
        state: {
            globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 6,
                pageIndex: 0,
            }
        },
        onGlobalFilterChange:setGlobalFilter,
        getFilteredRowModel:getFilteredRowModel(),
    });

    return (
        <>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <input
                className="h-10 border border-gray-300 p-4 mb-5 rounded-md"
                value={table.getState().globalFilter}
                onChange={(e)=>table.setGlobalFilter(e.target.value)}
                placeholder="Buscar pedido"
            />
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-md pb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b border-gray-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                            key={row.id}
                            className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100"
                            >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                key={cell.id}
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-center gap-10 mt-4">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="btn-paginacion"
                    >
                        Anterior
                    </button>

                    <span className="text-base">
                        Página {table.getState().pagination.pageIndex + 1} de{" "}
                        {table.getPageCount()}
                    </span>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="btn-paginacion"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
            
        </>
    )
}