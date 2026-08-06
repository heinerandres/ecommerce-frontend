'use client';


import { RootState } from "@/src/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";


export const NavCart = () => {

    const { email, uid } = useSelector((state: RootState) => state.user);
    
    //consultar carro y hacer uno si no tiene

  return (
    <Link href="/cart" className="flex items-center font-bold cursor-pointer"><i className="fa fa-shopping-cart mr-2"></i>Carrito</Link>
  )
}
