'use client';


import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Ingresar } from '../login/Ingresar';
import { useDispatch } from 'react-redux';

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();  
  enum LoginType {
    REGISTRAR,
    USERPASS,
    GOOGLE,
    FACEBOOK,
  }

  const handleRegister = async (e:any) => {
    e.preventDefault();
    await Ingresar({email, password, setErrorMessage, dispatch, loginType: LoginType.REGISTRAR, router});
  }

  return (
    <div className="flex justify-center min-h-screen md:pt-30 2xl:pt-52">

      <div className="w-80">
        <h1 className=" text-4xl mb-5" >Ingresar</h1>

        <form onSubmit={ handleRegister } className="flex flex-col">

          <label htmlFor="correo">Correo</label>
          <input
            minLength={5}
            required
            className="px-5 py-2 bg-gray-200 rounded mb-5"
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"/>

          <label htmlFor="password">Contraseña</label>
            <input
              minLength={5}
              required
              className="px-5 py-2 bg-gray-200 rounded mb-5"
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              />


            <label htmlFor="password">Confirmar contraseña</label>
            <input
              minLength={5}
              required
              className="px-5 py-2 bg-gray-200 rounded mb-5"
              type="password" 
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirmar contraseña"
              />

            { passwordCheck && 
            <h1 className='text-red-500'>
              <i className="fa fa-info-circle"></i>
              Las contraseñas no coinciden
            </h1>}

            { errorMessage !== "" &&
              <span className="text-red-500">
                {errorMessage}
              </span>
            }
            <button
              type="submit"
              className="bg-blue-600 py-2 rounded text-white cursor-pointer">
              Registrar
            </button>

            {/* divisor l ine */ }
            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-gray-500"></div>
              <div className="px-2 text-gray-800">O</div>
              <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
              href="/auth/login" 
              className="bg-gray-200 text-center rounded py-2">
              Ingresar
            </Link>
        </form>
      </div>

      
    </div>
  );
}