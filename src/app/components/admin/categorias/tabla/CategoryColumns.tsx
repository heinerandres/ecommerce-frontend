import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import EliminarCategoria from "../EliminarCategoria";

export const CategoryColumns: ColumnDef<{_id: string, nombre: string, cantidadProductos: number}>[] = [
    {
        accessorKey: "nombre",
        header: () => (<>Nombre</>)
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
                href={`/admin/categorias/${row.original.nombre}`}
                className="hover:underline"
            >
                Editar
            </Link>
        ),
    },
    {
        id: "eliminar",
        header: () => (<><i className="fa-solid fa-trash text-md mr-2"></i>Eliminar</>),
        cell: ({ row }) => (
            <EliminarCategoria categoria={row.original} />
        ),
    },
];