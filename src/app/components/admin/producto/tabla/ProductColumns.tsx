
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { IProducto } from "@/src/interfaces/producto";
import EliminarProducto from "../EliminarProducto";

export const ProductColumns: ColumnDef<IProducto>[] = [
    {
        id: "nombre",
        header: () => (<>Nombre</>),
        cell: ({ row }) => (
            <p className="font-semibold">{row.original.nombre}</p>
        ),
    },
    {
        accessorFn: row => row.categoria.nombre,
        id: "categoria",
        header: () => <>Categoría</>
    },
    {
        id: "detalles",
        header: () => (<><i className="fa-solid fa-clipboard-list text-md mr-2"></i>Detalles</>),
        cell: ({ row }) => (
            <Link
                href={`/admin/productos/detalles/${row.original.slug}`}
                className="hover:underline"
            >
                Ver Detalles
            </Link>
        )
    },
    {
        id: "editar",
        header: () => (<><i className="fa-solid fa-pen text-md mr-2"></i>Editar</>),
        cell: ({ row }) => (
            <Link
                href={`/admin/productos/editar/${row.original.slug}`}
                className="hover:underline"
            >
                Editar
            </Link>
        ),
    },
    {
        id: "imagenes",
        header: () => (<><i className="fa-solid fa-images text-md mr-2"></i>Imágenes</>),
        cell: ({ row }) => {
            const producto = row.original;
            return (
            <div className="flex items-center">
                {producto.imagenes?.length === 0 && (
                <div className="relative group inline-flex items-center mr-2">
                    <i className="fa-solid fa-circle-info text-md text-blue-500 cursor-pointer"></i>

                    <div
                    className="absolute left-1/2 -translate-x-1/2 top-5 w-35
                                hidden group-hover:block
                                bg-gray-800 text-white text-xs
                                px-2 py-1 rounded whitespace-normal z-50"
                    >
                    Los productos sin imágenes no se muestran en la página principal.
                    </div>
                </div>
                )}

                <Link
                    href={`/admin/productos/imagenes/${producto.slug}`}
                    className="hover:underline"
                >
                    Imágenes
                </Link>
            </div>
            );
        },
    },
    {
        id: "variantes",
        header: () => (<><i className="fa-solid fa-tag text-lg mr-2"></i>Variantes</>),
        cell: ({ row }) => {
            const producto = row.original;

            const tieneIndividual =
            producto.cantidad !== undefined &&
            producto.precio !== undefined;

            const tieneVariantes =
            (producto.variantes?.length ?? 0) > 0;

            if (!tieneIndividual && !tieneVariantes) {
                return (
                    <div>
                        <Link
                            href={`/admin/productos/individual/${producto.slug}`}
                            className="hover:underline mr-2"
                        >
                            Sin Variantes
                        </Link>

                        |

                        <Link
                            href={`/admin/productos/variantes/${producto.slug}`}
                            className="hover:underline ml-2"
                        >
                            Variantes
                        </Link>
                    </div>
                );
            }

            if (tieneIndividual) {
                return (
                    <Link
                        href={`/admin/productos/individual/${producto.slug}`}
                        className="hover:underline"
                    >
                        Sin Variantes
                    </Link>
                );
            }
            return (
                <Link
                    href={`/admin/productos/variantes/${producto.slug}`}
                    className="hover:underline"
                >
                    Variantes
                </Link>
            );
        },
    },
    {
        id: "eliminar",
        header: () => (<><i className="fa-solid fa-trash text-md mr-2"></i>Eliminar</>),
        cell: ({ row }) => (
            <EliminarProducto producto={row.original} />
        ),
    },
];