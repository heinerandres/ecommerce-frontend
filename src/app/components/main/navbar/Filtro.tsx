'use client';

import { useFiltro } from "@/src/context/FilterContext";

type Props = {
    categorias: {_id: string, nombre: string, cantidadProductos: number}[] | null;
} 

export const Filtro = ({categorias}: Props) => {

    const { busqueda, setBusqueda, categoria, setCategoria } = useFiltro();

  return (
    <div className="flex h-[45%] ml-[2%] ">
        <select 
            className="text-black bg-white border cursor-pointer border-gray-300 rounded-l-lg px-[1%] md:w-[11vw] 2xl:w-[10vw] md:text-sm 2xl:text-lg"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
        >
            <option value="">Todas las Categorías</option>
            {categorias?.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                {categoria.nombre}
                </option>
            ))}
        </select>
        <input 
            type="text" 
            className="md:w-[37vw] 2xl:w-[40vw] border px-3 border-gray-300"
            value={ busqueda }
            onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="h-full w-[5%] bg-amber-400 rounded-r-lg cursor-pointer">
            <i className="fa fa-search "></i>
        </button>
    </div>
  )
}


