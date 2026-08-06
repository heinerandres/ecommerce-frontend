'use client';

import { RootState } from "@/src/redux/store";
import Link from "next/link"
import { useSelector } from "react-redux";


export const Identificate = () => {
    const { user } = useSelector((state: RootState) => state.user);

  return (
    <Link 
        href="/" 
        className="font-bold text-center cursor-pointer">
            <p>Hola</p> 
            <p>{user === null ? "Identificate": user}</p>
    </Link>
  )
}
