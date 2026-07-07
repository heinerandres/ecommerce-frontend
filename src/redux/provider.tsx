"use client";

import { AuthProvider, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { auth } from "../services/google/GoogleAuth";
import { store } from "@/src/redux/store";

import { login, logout, setChecking } from "@/src/redux/slices/userSlice"; 
import { crearCarrito, getCarrito } from "../services/api/server/carritos";
import Swal from 'sweetalert2';
import { setCarritox } from "./slices/carritoSlice";

function AuthListener({children,}: {children: React.ReactNode;}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async(user) => {
        if(!user){
          dispatch(logout());
          dispatch(setChecking(false));
          return;
        }
        //continuar el login
        //consultar carrito
        const resConsulta = await getCarrito(user.uid);
        if(!resConsulta.ok) Swal.fire({title: 'Error', text: resConsulta.msg, icon: 'error', confirmButtonText: 'Ok'});
        if(resConsulta.ok && resConsulta.carrito === null){
          const resCrear = await crearCarrito({usuario_id: user.uid, productos: []})
          if(!resCrear.ok) Swal.fire({title: 'Error', text: resCrear.msg, icon: 'error', confirmButtonText: 'Ok'}); 
        }
        //almacenar en estado global
        dispatch(login({user: user.email, email: user.email, uid:user.uid}));
        dispatch(setCarritox({
          _id: resConsulta.carrito._id, 
          usuario_id: user.uid, 
          productosCarrito: resConsulta.carrito.productos, 
          productos: resConsulta.productos}));
          
        dispatch(setChecking(false));
      }
    );
    return () => unsubscribe();
  }, []);

  return children;
}

export function Providers({ children, }: {children: React.ReactNode;}) {

  return (
    <Provider store={store}>
      <AuthListener>
        {children}
      </AuthListener>
    </Provider>
    );

  }