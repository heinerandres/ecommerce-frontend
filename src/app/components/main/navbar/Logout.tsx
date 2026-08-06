'use client';

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/src/redux/slices/userSlice";
import { logoutCart } from "@/src/redux/slices/carritoSlice";
import { logoutUser } from '@/src/services/google/auth';


export const LogOut = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        try{
            logoutUser()
            dispatch(logout());
            dispatch(logoutCart());

            router.replace("/auth/login");
        }
        catch (error){
            console.error("Error al cerrar sesión: ", error);
        }
    }

  return (
    <button onClick={handleLogout} className="flex items-center font-bold px-2 cursor-pointer">Salir<i className="fa fa-sign-out-alt ml-3"></i></button>
  )
}