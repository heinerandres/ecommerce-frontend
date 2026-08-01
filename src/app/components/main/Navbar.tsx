'use server';
import Link from "next/link";

import { LogOut } from "./navbar/Logout";
import { Identificate } from "./navbar/Identificate";
import { NavCart } from "./navbar/NavCart";
import { getCategorias } from "@/src/services/api/server/categorias";
import { Filtro } from "./navbar/Filtro";
import { NavbarAdmin } from "./NavbarAdmin";

export const Navbar = async () => {

  let categorias: {_id: string, nombre: string, cantidadProductos: number}[] | null = null;
  let errorMsg = null;

  const respuesta = await getCategorias();
  if (respuesta.ok) categorias = respuesta.categorias;
  else errorMsg = respuesta.msg;

  return (
     <nav className="xl:h-17 2xl:h-[10vh] shadow-md">
      <div className="flex items-center h-full px-4 gap-4">
          <Link className="" href="/">
              <img
                  src="/next.svg"
                  className="h-6 xl:h-6 2xl:h-10 w-auto"
              />
          </Link>
          <NavbarAdmin />
          <div className="flex-1 min-w-0">
              <Filtro categorias={categorias} />
          </div>
          <div className="flex items-center gap-4 shrink-0">
              <Identificate />
              <Link
                  href="/pedidos"
                  className="flex items-center font-bold whitespace-nowrap"
              >
                  <i className="fa fa-gift mr-2"></i>
                  Pedidos
              </Link>
              <NavCart />
              <LogOut />
          </div>
      </div>
  </nav>
  )
}