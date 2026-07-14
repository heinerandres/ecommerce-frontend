'use server';
import Link from "next/link";

import { LogOut } from "./navbar/Logout";
import { Identificate } from "./navbar/Identificate";
import { NavCart } from "./navbar/NavCart";
import { getCategorias } from "@/src/services/api/server/categorias";
import { Filtro } from "./navbar/Filtro";

export const Navbar = async () => {

  let categorias: {_id: string, nombre: string, cantidadProductos: number}[] | null = null;
  let errorMsg = null;

  const respuesta = await getCategorias();
  if (respuesta.ok) categorias = respuesta.categorias;
  else errorMsg = respuesta.msg;

  return (
     <nav className="max-w-screen h-[10vh] bg-white border-b border-gray-200 shadow-lg z-20"> 
        <div className="flex items-center justify-around h-full w-full max-w-screen ">
            <Link href='/'><img className="h-full w-[5vw] md:w-[8vw] 2xl:w-[10vw]" src="/next.svg" /></Link>
            <Filtro categorias={ categorias }/>
            
            <div className="flex md:w-[35vw] 2xl:w-[26vw]">
              
              <Identificate />
              <Link href="/pedidos" className="flex items-center font-bold px-[4%] cursor-pointer md:text-sm lg:text-lg"><i className="fa fa-gift mr-[5%]"></i>Pedidos</Link>
              <NavCart />
              <LogOut />
            </div>
        </div>
    </nav>
  )
}