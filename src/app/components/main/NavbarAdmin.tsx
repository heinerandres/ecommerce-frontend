import Link from "next/link"


export const NavbarAdmin = () => {
    return (
        <nav className="w-[30%] flex justify-around bg-white z-10 py-2">
            <Link href="/admin/colores" className="text-sm 2xl:text-lg">Colores</Link>
            <Link href="/admin/tallas" className="text-sm 2xl:text-lg">Tallas</Link>
            <Link href="/admin/slugs" className="text-sm 2xl:text-lg">Slugs</Link>
            <Link href="/admin/productos" className="text-sm 2xl:text-lg">Productos</Link>
            <Link href="/admin/categorias" className="text-sm 2xl:text-lg">Categorías</Link>
            <Link href="/admin/Pedidos" className="text-sm 2xl:text-lg">Pedidos</Link>
        </nav>
    )
}