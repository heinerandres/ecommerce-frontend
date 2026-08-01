'use client';
import { RootState } from "@/src/redux/store";
import { administrators } from "@/src/utilities/administrators";
import Link from "next/link";
import { useSelector } from "react-redux";


export const NavbarAdmin = () => {
    /* const usuario = useSelector((state: RootState) => state.user);
    if(!administrators.includes(usuario.uid)){
        return null;
    } */

    return (
        <div className="flex h-full p-4">
            <Link href="/admin/productos" className="flex lg:p-2 xl:px-3 2xl:px-5 items-center cursor-pointer border border-gray-300 rounded-md">
                <i className="fa-solid fa-gears"></i>
                <p className="group-hover:block font-bold px-1 xl:px-2 2xl:px-3">Administrar Tienda</p>
                <i className="fa-solid fa-chart-line"></i>
            </Link>
        </div>
        
    )
}