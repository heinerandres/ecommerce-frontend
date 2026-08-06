'use client';
import { IProducto } from "@/src/interfaces/producto";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, getFilteredRowModel, getExpandedRowModel } from "@tanstack/react-table";
import { useState, Fragment } from "react";
import { ProductoColumns } from "./ProductColumns";

type Props = {
    productos: IProducto[] | null;
    globalFilter: string;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    agregarProducto: (producto:IProducto) => void;
}

export default function TablaProductos({productos, agregarProducto, globalFilter, setGlobalFilter}: Props) {
    const [expanded, setExpanded] = useState({});


    const table = useReactTable({
        data: productos ?? [],
        columns: ProductoColumns(agregarProducto),
        state: {
            globalFilter,
            expanded,
        },
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 8,
                pageIndex: 0,
            }
        },
        onGlobalFilterChange:setGlobalFilter,
        getFilteredRowModel:getFilteredRowModel(),
        getRowCanExpand: (row) => (row.original.variantes?.length ?? 0) > 0,
    });

    return (
        <>
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
                            <Fragment key={row.id}>
                                
                                {/* Fila principal */}
                                <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out">
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


                                {/* Fila expandible */}
                                {(row.original.variantes?.length ?? 0) > 0 && (
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan={row.getVisibleCells().length}
                                            className="p-0"
                                        >
                                            <div
                                                className={`grid transition-all duration-300 ease-in-out ${
                                                    row.getIsExpanded()
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="p-6">

                                                        <table className="w-full border border-gray-200 rounded-lg">
                                                            <thead className="bg-gray-100">
                                                                <tr>
                                                                    <th className="text-left px-4 py-2 text-sm">
                                                                        Talla
                                                                    </th>
                                                                    <th className="text-left px-4 py-2 text-sm">
                                                                        Color
                                                                    </th>
                                                                    <th className="text-left px-4 py-2 text-sm">
                                                                        Precio
                                                                    </th>
                                                                    <th className="text-left px-4 py-2 text-sm">
                                                                        Cantidad
                                                                    </th>
                                                                    <th className="text-left px-4 py-2 text-sm">
                                                                        Agregar
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {row.original.variantes?.map((v) => (
                                                                    <tr
                                                                        key={v._id}
                                                                        className="border-t border-gray-200"
                                                                    >
                                                                        <td className="px-4 py-2 text-sm">
                                                                            {v.talla?.valor ?? "Sin talla"}
                                                                        </td>
                                                                        
                                                                        <td className="px-4 py-2 text-sm">
                                                                            {v.color.nombre}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-sm">
                                                                            ₡{v.precio.toLocaleString()}
                                                                        </td>

                                                                        <td className="px-4 py-2 text-sm">
                                                                            {v.cantidad}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-sm">
                                                                            <button onClick={()=> agregarProducto({...row.original, variantes:[v],})} className="text-xs border px-1 py-1 rounded-lg border-blue-700 text-blue-700 cursor-pointer">
                                                                                <i className="text-xs fa-solid fa-cart-plus mr-2"></i>
                                                                                Agregar
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                            </Fragment>
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
