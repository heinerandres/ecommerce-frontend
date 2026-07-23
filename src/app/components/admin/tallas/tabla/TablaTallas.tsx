'use client';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, getFilteredRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { TallaColumns } from "./TallaColumns";

type Props = {
    tallas: {_id: string, valor:string, cantidadProductos:number}[]  | null;
}

export default function TablaTallas({tallas}: Props) {
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: tallas ?? [],
        columns: TallaColumns,
        state: {
            globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 8,
                pageIndex: 0,
            }
        },
        onGlobalFilterChange:setGlobalFilter,
        getFilteredRowModel:getFilteredRowModel(),
    });

    return (
        <>
            <input
                className="h-10 border border-gray-300 p-4 mb-5 rounded-md"
                value={table.getState().globalFilter}
                onChange={(e)=>table.setGlobalFilter(e.target.value)}
                placeholder="Buscar talla"
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
                        className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-auto"
                    >
                        Anterior
                    </button>

                    <span>
                        Página {table.getState().pagination.pageIndex + 1} de{" "}
                        {table.getPageCount()}
                    </span>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-auto"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
            
        </>
    )
}
