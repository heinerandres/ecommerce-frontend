import Link from "next/link"


export const NavbarAdmin = () => {
    return (
        <nav className="w-[30%] flex justify-around bg-white z-10 py-2">
            <Link href="/admin/colores" className="">Colores</Link>
            <Link href="" className="">Tallas</Link>
            <Link href="" className="">Productos</Link>
            <Link href="" className="">Categorías</Link>
            <Link href="" className="">Pedidos</Link>
        </nav>
    )
}