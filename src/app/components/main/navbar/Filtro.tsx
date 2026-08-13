'use client';

import { useFiltro } from "@/src/context/FilterContext";

type Props = {
    categorias: {_id: string, nombre: string, cantidadProductos: number}[] | null;
} 

export const Filtro = ({categorias}: Props) => {

    const { busqueda, setBusqueda, categoria, setCategoria } = useFiltro();

  return (
    <div className="flex h-7 xl:h-9 2xl:h-11">
        <select 
            name="select-filtro-categorias"
            className="text-black bg-white border cursor-pointer border-gray-300 rounded-l-md px-[1%] 2xl:w-45 2xl:text-base"
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
            name="input-filtro-productos"
            type="text" 
            className="md:w-[37vw] 2xl:w-[30vw] border px-3 border-gray-300"
            value={ busqueda }
            onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="h-full lg:w-10 w-[5%] bg-amber-400 rounded-r-lg cursor-pointer">
            <i className="fa fa-search 2xl:text-base"></i>
        </button>
    </div>
  )
}


