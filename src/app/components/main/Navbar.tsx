import Link from "next/link";

import { LogOut } from "./navbar/Logout";
import { Identificate } from "./navbar/Identificate";
import { NavCart } from "./navbar/NavCart";

export const Navbar = () => {
  return (
     <nav className="max-w-screen h-[10vh] bg-white border-b border-gray-200 shadow-lg z-20"> 
        <div className="flex items-center justify-around h-full w-full max-w-screen ">
            <Link href='/'><img className="h-full w-[5vw] md:w-[8vw] 2xl:w-[10vw]" src="/next.svg" /></Link>
            <div className="flex h-[45%] ml-[2%] ">
              <select className="text-black bg-gray-200 rounded-l-lg px-[1%] md:w-[11vw] 2xl:w-[10vw] md:text-sm 2xl:text-lg">
                <option>Todas las Categorías</option>
                <option>Camisetas</option>
                <option>Pantalonetas</option>
                <option>Pijamas</option>
              </select>
              <input type="text" className="md:w-[37vw] 2xl:w-[40vw] border border-gray-300"></input>
              <button className="h-full w-[5%] bg-amber-400 rounded-r-lg cursor-pointer">
                <i className="fa fa-search "></i>
              </button>
            </div>
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