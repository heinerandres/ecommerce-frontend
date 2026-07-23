
'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { editarDireccion, insertarDireccion, obtenerDireccion } from "@/src/services/api/server/direccion";
import { useSelector } from "react-redux";
import { RootState } from '@/src/redux/store';


export default function FormInsertarDireccion() {
    const [errorMsg, setErrorMsg] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direccion2, setDireccion2] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [telefono, setTelefono] = useState('');
    const [existeDireccion, setExisteDireccion] = useState(false);
    const router = useRouter();

    const carrito = useSelector((state: RootState) => state.carrito.carrito);
    

    useEffect(() => {
        const obtenerDatos = async () => {
          //if carrito_id es para que no entre al useEffect si no ha consultado la sesión
            if(carrito._id){
                const respuesta = await obtenerDireccion({carrito: carrito._id});
                if(respuesta.ok){
                    const direccion = respuesta.direccion;
                    if(direccion){
                      setNombres(direccion.nombres);
                      setApellidos(direccion.apellidos);
                      setDireccion(direccion.direccion);
                      setDireccion2(direccion.direccion2);
                      setCodigoPostal(direccion.codigoPostal);
                      setCiudad(direccion.ciudad);
                      setPais(direccion.pais);
                      setTelefono(direccion.telefono);
                      setExisteDireccion(true);
                    }
                }
                else setErrorMsg(JSON.stringify(respuesta));
            }
        };
        obtenerDatos();
    }, [carrito._id]);

    const handleDireccion = async(e:any) => {
        e.preventDefault();
        if(existeDireccion){
            const _direccion = {
              carrito: carrito._id,
              nombres,
              apellidos,
              direccion,
              direccion2,
              codigoPostal,
              ciudad,
              pais,
              telefono,
            }
            const respuesta = await editarDireccion(_direccion);
            console.log(respuesta);
            if(respuesta.ok){
              router.push('/checkout');
              return;
            }
            else setErrorMsg(JSON.stringify(respuesta));
            return;
        }
        const respuesta = await insertarDireccion({carrito: carrito._id, nombres, apellidos, direccion, direccion2, codigoPostal, ciudad, pais, telefono});
        if (respuesta.ok) router.push('/checkout');
        else setErrorMsg(JSON.stringify(respuesta));
    }
    return (
        <form onSubmit={handleDireccion} className="w-full  xl:w-250 flex flex-col justify-center text-left">
        <h5 className="md:text-3xl 2xl:text-4xl font-bold mt-[5%]">Dirección</h5>
        <h3 className="md:text-sm 2xl:text-lg py-[2%]">Dirección de entrega</h3>
        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>Nombres</span>
            <input
                minLength={2}
                required
                className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                type="text" 
                placeholder="Nombres"
                name="nombre"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <span>Apellidos</span>
            <input
                minLength={2}
                required
                className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                type="text" 
                placeholder="Apellidos"
                name="apelllidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <span>Dirección</span>
            <input
                minLength={2}
                required
                className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                type="text" 
                placeholder="Dirección"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <span>Dirección 2 (opcional)</span>
            <input
                className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                type="text" 
                placeholder="Dirección2"
                name="direccion2"
                value={direccion2}
                onChange={(e) => setDireccion2(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <span>Código postal</span>
            <input
                minLength={2}
                required
                className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                type="text" 
                placeholder="Codigo Postal"
                name="codigoPostal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <span>Ciudad</span>
            <input
                minLength={2}
                required
                className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                type="text" 
                placeholder="Ciudad"
                name="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <span>País</span>
            <select 
              className="p-2 rounded-md bg-white border"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            >
              <option value="">[ Seleccione ]</option>
              <option value="CRI">Costa Rica</option>
            </select>
          </div>
          <div className="flex flex-col mb-2">
            <span>Teléfono</span>
            <input
                minLength={2}
                required
                className="px-5 md:text-sm 2xl:text-lg md:py-2 2xl:py-2 bg-white border rounded mb-5"
                type="text" 
                placeholder="Teléfono"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
            { errorMsg !== "" &&
                <span className="text-red-500">
                {errorMsg}
                </span>
            }
          <div className="flex flex-col mb-2 sm:mt-10">
            <button 
              type="submit"
              className="bg-blue-600 text-white py-[1%] rounded flex w-full sm:w-1/2 justify-center cursor-pointer">
              Siguiente
            </button>
          </div>
        </div>
      </form>
        
    )
}

