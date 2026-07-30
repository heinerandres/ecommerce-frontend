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
            <Link href="/admin/productos" className="flex p-3 items-center cursor-pointer border border-gray-300 rounded-xl">
                <i className="fa-solid fa-gears text-xl ml-2 mr-3"></i>
                <p className="group-hover:block font-bold mr-4">Administrar Tienda</p>
                <i className="fa-solid fa-chart-line text-xl ml-2 mr-3"></i>
            </Link>
        </div>
        
    )
}