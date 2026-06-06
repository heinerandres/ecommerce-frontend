
import Link from 'next/link';

export default function NamePage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0 md:text-sm 2xl:text-lg">



      <div className="w-full  xl:w-250 flex flex-col justify-center text-left">
        
        <h5 className="md:text-3xl 2xl:text-4xl font-bold mt-[5%]">Dirección</h5>
        <h3 className="md:text-sm 2xl:text-lg py-[2%]">Dirección de entrega</h3>

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">


          <div className="flex flex-col mb-2">
            <span>Nombres</span>
            <input 
              type="text" 
              className="p-2 rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Apellidos</span>
            <input 
              type="text" 
              className="p-2 rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Dirección</span>
            <input 
              type="text" 
              className="p-2 rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Dirección 2 (opcional)</span>
            <input 
              type="text" 
              className="p-2  rounded-md bg-gray-200"
            />
          </div>


          <div className="flex flex-col mb-2">
            <span>Código postal</span>
            <input 
              type="text" 
              className="p-2 rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Ciudad</span>
            <input 
              type="text" 
              className="p-2 rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>País</span>
            <select 
              className="p-2 rounded-md bg-gray-200"
            >
              <option value="">[ Seleccione ]</option>
              <option value="CRI">Costa Rica</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Teléfono</span>
            <input 
              type="text" 
              className="p-2 rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link 
              href='/checkout'
              className="bg-blue-600 text-white py-[1%] rounded flex w-full sm:w-1/2 justify-center cursor-pointer">
              Siguiente
            </Link>
          </div>


        </div>

      </div>
    </div>
  );
}