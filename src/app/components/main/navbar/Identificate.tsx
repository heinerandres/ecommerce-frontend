'use client';

import { RootState } from "@/src/redux/store";
import Link from "next/link"
import { useSelector } from "react-redux";


export const Identificate = () => {
    const { user } = useSelector((state: RootState) => state.user);

  return (
    <Link 
        href="/" 
        className="font-bold px-[4%] text-center cursor-pointer md:text-sm 2xl:text-lg">
            Hola {user === null ? "Identificate": user}
    </Link>
  )
}
