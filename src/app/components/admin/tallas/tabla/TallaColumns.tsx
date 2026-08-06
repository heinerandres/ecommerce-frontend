import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import EliminarTallas from "../EliminarTallas";

export const TallaColumns: ColumnDef<{_id: string, valor: string, cantidadProductos: number}>[] = [
    {
        accessorKey: "valor",
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
                href={`/admin/tallas/${row.original.valor}`}
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
            <EliminarTallas talla={row.original} />
        ),
    },
];