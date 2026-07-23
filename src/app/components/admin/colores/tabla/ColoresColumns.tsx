import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import EliminarColor from "../EliminarColor";

export const ColoresColumns: ColumnDef<{_id: string, nombre: string, valor: string, cantidadProductos: number}>[] = [
    {
        id: "nombre",
        header: () => (<>Nombre</>),
        cell: ({ row }) => (
            <div className="flex items-center">
                <div style={{backgroundColor: row.original.valor}}  className="border md:w-6 2xl:w-7 md:h-6 2xl:h-7 rounded-full mr-5"></div>
                <p className="font-medium">{row.original.nombre}</p>
            </div>
        ),
    },
    {
        accessorKey: "valor",
        header: () => <>Color</>
    },
    {
        accessorKey: "cantidadProductos",
        header: () => <>Productos</>
    },
    {
        id: "editar",
        header: () => (<><i className="fa-solid fa-pen text-md mr-2"></i>Editar</>),
        cell: ({ row }) => (
            <Link
                href={`/admin/colores/${row.original.nombre}`}
                className="hover:underline"
            >
                <i style={{color: row.original.valor}}  className="fa-solid fa-paintbrush md:text-sm 2xl:text-md drop-shadow-[0.8px_0.8px_0.8px_black] mr-3"></i>
                Editar
            </Link>
        ),
    },
    {
        id: "eliminar",
        header: () => (<><i className="fa-solid fa-trash text-md mr-2"></i>Eliminar</>),
        cell: ({ row }) => (
            <EliminarColor color={row.original} />
        ),
    },
];