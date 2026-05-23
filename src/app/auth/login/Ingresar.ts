import { setCarritox } from "@/src/redux/slices/carritoSlice";
import { login } from "@/src/redux/slices/userSlice";
import { AppDispatch } from "@/src/redux/store";
import { crearCarrito, getCarrito } from "@/src/services/api/server/carritos";
import { loginUser, loginGoogle, registerUser } from "@/src/services/google/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

enum LoginType {
    REGISTRAR,
    USERPASS,
    GOOGLE,
    FACEBOOK,
}

type Props = {
    email?: string,
    password?: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    loginType: LoginType,
    dispatch: AppDispatch,
    router: AppRouterInstance,
}

export const Ingresar = async({email, password, setErrorMessage, loginType, dispatch, router}: Props) => {  
    try{
      //consultar usuario con google
        let response;
        switch(loginType){
            case LoginType.REGISTRAR:
                response = await registerUser(email, password);
                break;
            case LoginType.USERPASS:
                response = await loginUser(email, password);
                break;
            case LoginType.GOOGLE:
                response = await loginGoogle();
                break;
            case LoginType.FACEBOOK:
                //response = await
                break;
            default:
                throw new Error("Login inválido");
        } 
      //consultar carrito
      const resConsulta = await getCarrito(response?.user.uid);
      if(!resConsulta.ok) setErrorMessage(resConsulta.msg);
      if(resConsulta.ok && resConsulta.carrito === null){
        const resCrear = await crearCarrito({usuario_id: response?.user.uid, productos: []})
        if(!resCrear.ok) setErrorMessage(resCrear.msg);
      }
      //almacenar en estado global
      dispatch(login({user: response?.user.email, email: response?.user.email, uid:response?.user.uid}));
      dispatch(setCarritox({
          _id: resConsulta.carrito._id, 
          usuario_id: response?.user.uid, 
          productosCarrito: resConsulta.carrito.productos, 
          productos: resConsulta.productos}));
      router.replace("/");
    }
    catch(error:any){
      console.log(error);
      setErrorMessage(error.message);
    }
}