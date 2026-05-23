'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { Ingresar } from './Ingresar';
import { GoogleLogin } from '../../components/login/GoogleLogin';

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();  
  enum LoginType {
    REGISTRAR,
    USERPASS,
    GOOGLE,
    FACEBOOK,
  }

  const handleIngresar = async(e:any) => {
    e.preventDefault();
    await Ingresar({email, password, setErrorMessage, dispatch, loginType: LoginType.USERPASS, router});
  }
  return (
    <div className="flex justify-center min-h-screen pt-32 sm:pt-52">
      <div className="w-80">
        <h1 className=" text-4xl mb-5" >Ingresar</h1>
        <form onSubmit={handleIngresar} className="flex flex-col">
          <label htmlFor="email">Correo electrónico</label>
          <input
            minLength={5}
            required
            className="px-5 py-2 bg-gray-200 rounded mb-5"
            type="email" 
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            />
          <label htmlFor="password">Contraseña</label>
          <input
            minLength={5}
            required
            className="px-5 py-2 bg-gray-200 rounded mb-8"
            type="password" 
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}/>

          { errorMessage !== "" &&
            <span className="text-red-500">
              {errorMessage}
            </span>
          }
          <button
            type="submit"
            className="bg-blue-600 py-2 rounded text-white cursor-pointer">
            Ingresar
          </button>

          {/* <GoogleLogin setErrorMessage={setErrorMessage}/> */}
          
          <GoogleLogin setErrorMessage={setErrorMessage}/>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 mt-2 rounded cursor-pointer border border-black/50">
            <img src="https://www.facebook.com/favicon.ico" width="25" height="20"/>
            Ingresar con Facebook
          </button>

          {/* divisor line */ }
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>

          <Link
            href="/auth/registro" 
            className="bg-gray-200 text-center rounded py-2">
            Crear una nueva cuenta
          </Link>

        </form>
      </div>

      
    </div>
  );
}