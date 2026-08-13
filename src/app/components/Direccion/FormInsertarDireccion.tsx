
'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { editarDireccion, insertarDireccion, obtenerDireccion } from "@/src/services/api/server/direccion";
import { useSelector } from "react-redux";
import { RootState } from '@/src/redux/store';
import StepProgress, { Step } from "../main/StepProgress";
import { currencyFormat } from "@/src/utilities/currencyFormat";


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
    <form onSubmit={handleDireccion} className="w-full lg:w-200 xl:w-250 2xl:w-[85%] flex flex-col justify-center text-left">
      <div className="flex items-center justify-center w-full mb-7 mt-7">
        <div className="w-[70%]">
          <StepProgress currentStep={Step.direccion} />
        </div>
      </div>
      <div className="flex gap-5 rounded-lg">
        <div className="w-[70%] px-10 py-5 border border-gray-200 rounded-lg">
          <h5 className="xl:text-2xl 2xl:text-3xl font-bold">Dirección de entrega</h5>
          <h3 className="xl:text-xs 2xl:text-sm py-1 text-gray-500">Complete la información para recibir el pedido</h3>
          <div className="flex items-center">
              <i className="fa-solid fa-address-card text-sm mr-3"></i>
              <div>
                <p className="text-base font-semibold">Información de envio</p>
              </div>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-8 sm:gap-y-2 text-base">
            <div className="flex flex-col mb-2">
              <span>Nombres</span>
              <div className="relative h-fit">
                <span className="absolute left-4 top-2  text-gray-500">
                  <i className="fa-regular fa-user" />
                </span>
                <input
                  minLength={2}
                  required
                  className="pl-12 w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  type="text" 
                  placeholder="Nombres"
                  name="nombre"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
              />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <span>Apellidos</span>
              <div className="relative h-fit">
                <span className="absolute left-4 top-2  text-gray-500">
                  <i className="fa-regular fa-user" />
                </span>
                <input
                  minLength={2}
                  required
                  className="pl-12 w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  type="text" 
                  placeholder="Apellidos"
                  name="apelllidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <span>Dirección</span>
              <div className="relative h-fit">
                <span className="absolute left-4 top-2  text-gray-500">
                  <i className="fa-solid fa-location-dot" />
                </span>
                <input
                  minLength={2}
                  required
                  className="pl-12 w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  type="text" 
                  placeholder="Dirección"
                  name="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
              />
              </div>
              
            </div>
            <div className="flex flex-col mb-2">
              <span>Dirección 2 (opcional)</span>
                <input
                  className="w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  type="text" 
                  placeholder="Dirección 2, Apartamento, Edificio, etc."
                  name="direccion2"
                  value={direccion2}
                  onChange={(e) => setDireccion2(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-2">
              <span>Código postal</span>
              <div className="relative h-fit">
                <span className="absolute left-4 top-2  text-gray-500">
                  <i className="fa-regular fa-user" />
                </span>
                <input
                  minLength={2}
                  required
                  className="pl-12 w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  type="text" 
                  placeholder="Codigo Postal"
                  name="codigoPostal"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
              />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <span>Ciudad</span>
              <div className="relative h-fit">
                <span className="absolute left-4 top-2  text-gray-500">
                  <i className="fa-solid fa-building-user" />
                </span>
                <input
                  minLength={2}
                  required
                  className="pl-12 w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  type="text" 
                  placeholder="Ciudad"
                  name="ciudad"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
              />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <span>País</span>
              <div className="relative h-fit">
                <span className="absolute left-4 top-2  text-gray-500">
                  <i className="fa-solid fa-globe" />
                </span>
                <select 
                  className="pl-12 w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                >
                  <option value="">[ Seleccione ]</option>
                  <option value="CRI">Costa Rica</option>
                </select>
              </div>
              
            </div>
            <div className="flex flex-col mb-2">
              <span>Teléfono</span>
              <div className="relative h-fit">
                <span className="absolute left-4 top-2  text-gray-500">
                  <i className="fa-solid fa-phone" />
                </span>
                <input
                  minLength={2}
                  required
                  className="pl-12 w-full px-5 md:py-2 2xl:py-1.5 bg-white border border-gray-300 rounded"
                  type="text" 
                  placeholder="Teléfono"
                  name="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
              />
              </div>
              
            </div>
            
              { errorMsg !== "" &&
                  <span className="text-red-500">
                  {errorMsg}
                  </span>
              }
          </div>
          
          <div className="w-full mt-2">
            <div className="flex items-center">
              <i className="fa-solid fa-truck text-sm mr-3"></i>
              <div>
                <p className="text-base font-semibold">Método de envío</p>
                <p className="text-sm text-gray-600">Selecciona como quieres recibir el pedido</p>
              </div>
            </div>
            <div className="flex gap-4 w-full mt-4">
              <label className="flex-1 flex border border-gray-300 rounded-lg cursor-pointer has-checked:border-blue-400"> 
                <input type="radio" name="envio" value="uber" className="shrink-0 h-fit m-2"/>
                <div className="px-5 py-1 w-full">
                  <img src="/uberflash2.jpg" className="w-[25%] rounded" alt="UberFlash" />
                  <p className="text-sm font-semibold">Uber Flash</p>
                  <p className="text-xs text-gray-600">Entrega rápida y segura el mismo día</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-fit text-sm gap-2 p-1 bg-blue-100 rounded-md mt-2">
                      <i className="fa-solid fa-bolt text-yellow-500"></i>
                      <p className="text-xs font-semibold">Mismo día dentro de la GAM</p>
                    </div>
                  <p className="text-base text-blue-700 font-semibold mt-1.5">{currencyFormat(2500)}</p>
                  </div>
                </div>
              </label>
              <label className="flex-1 flex border border-gray-300 rounded-lg cursor-pointer has-checked:border-blue-400"> 
                <input type="radio" name="envio" value="correos" className="shrink-0 h-fit m-2"/>
                <div className="px-5 py-1 w-full">
                  <img src="/correoscr2.png" className="w-[22%] rounded" alt="Correos de Costa Rica" />
                  <p className="text-sm font-semibold">Correos de Costa Rica</p>
                  <p className="text-xs text-gray-600">Entrega a domicilio en todo el país</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-fit text-sm gap-2 p-1 bg-blue-100 rounded-md mt-2">
                      <i className="fa-regular fa-clock text-blue-500"></i>
                      <p className="text-xs font-semibold">2 a 4 días hábiles</p>
                    </div>
                  <p className="text-base text-blue-700 font-semibold mt-1.5">{currencyFormat(2500)}</p>
                  </div>
                </div>
              </label>
              
            </div>

          </div>
          <div className="flex flex-col w-[50%] mb-2 mt-0 2xl:mt-10">
            <button 
              type="submit"
              className="flex items-center gap-5 py-[1%] rounded w-full sm:w-1/2 justify-center bg-blue-600 text-white cursor-pointer">
              Siguiente
              <i className="fa-solid fa-arrow-right text-base mt-0.5"></i>
            </button>
          </div>
        </div>
        <div className="w-[25%] px-5">
          <div className="text-sm border border-gray-200 rounded-lg">
            <div className="flex gap-4 items-center flex-row mx-5 px-5 py-2 border-b border-gray-200">
              <i className="shrink-0 h-fit fa-solid fa-shield-heart p-4 2xl:p-4 text-blue-500 bg-blue-200 rounded-full"></i>
              <div className="h-fit">
                <p className="font-semibold">Compra segura</p>
                <p className="text-gray-600">Tus pagos están protegidos con encriptación</p>
              </div>
            </div>
            <div className="flex gap-4 items-center flex-row mx-5 px-5 py-2 border-b border-gray-200">
              <i className="shrink-0 h-fit fa-solid fa-truck p-4 2xl:p-4 text-purple-500 bg-purple-200 rounded-full"></i>
              <div className="h-fit">
                <p className="font-semibold">Envio rápido y gratis</p>
                <p className="text-gray-600">En pedidos mayores a $15.000 en todo Costa Rica</p>
              </div>
            </div>
            <div className="flex gap-4 items-center flex-row mx-5 px-5 py-2 border-b border-gray-200">
              <i className="shrink-0 h-fit fa-solid fa-rotate p-4 2xl:p-4 text-yellow-500 bg-yellow-200 rounded-full"></i>
              <div className="h-fit">
                <p className="font-semibold">Devoluciones fáciles</p>
                <p className="text-gray-600">Tienes 30 días para cambios o devoluciones</p>
              </div>
            </div>
            <div className="flex gap-4 items-center flex-row mx-5 px-5 py-2 border-b border-gray-200">
              <i className="shrink-0 h-fit fa-brands fa-whatsapp p-4 2xl:p-4 text-green-500 bg-green-200 rounded-full"></i>
              <div className="h-fit">
                <p className="font-semibold">Contáctanos por whatsapp</p>
                <p className="text-gray-600">Estamos para ayudarte siempre que lo necesites</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-blue-500 bg-blue-100 mt-10 p-5 rounded-lg">
            <i className="fa-solid fa-lock"></i>
            <div className="text-sm ">
              <p className="font-bold">Tus datos están protegidos</p>
              <p>No compartimos tu información personal con terceros</p>
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}

