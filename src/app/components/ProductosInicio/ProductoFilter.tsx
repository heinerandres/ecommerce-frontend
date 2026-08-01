'use client';

import { IProducto } from "@/src/interfaces/producto";
import { Producto } from "./Producto";
import { useFiltro } from "@/src/context/FilterContext";


type Props = {
    productos: IProducto[] | null;
    imagenes: {_id: string, producto: string, url: string}[]
} 

export default function ProductoFilter({productos, imagenes} : Props) {
    const {busqueda, categoria} = useFiltro();

    const productosFiltrados = productos?.filter((producto) => {
        if (busqueda === '' && categoria === '') {
            return true;
        }
    
        const coincideNombre = producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

        const coincideCategoria =
            categoria === '' || producto.categoria._id === categoria;

        return coincideNombre && coincideCategoria;
    });
    
            
    
    return(
        <div className="w-[78vw] xl:w-[78vw] 2xl:w-[75vw] grid grid-cols-4 grid-rows-2 gap-4">
          {
            productosFiltrados?.map((producto, index) => (
              <Producto key={ index } producto = { producto } imgs={imagenes.filter(imagen => imagen.producto === producto._id)}/>
            ))
          }
        </div>
    )
}