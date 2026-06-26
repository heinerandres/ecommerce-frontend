'use client';

import { eliminarCategoria } from '@/src/services/api/server/categorias';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

type Props = {
    categoria: {_id: string, nombre:string, cantidadCategorias:number} | null;
}

export default function EliminarCategoria({categoria} : Props) {

    const router = useRouter();
    const handleEliminar = async() => {


        if((categoria?.cantidadCategorias ?? 0) === 0){
            const respuesta = await eliminarCategoria({_id: categoria?._id});
             
            if (respuesta.ok) {
              router.push('/admin/categorias');
            } else {
                     console.log(respuesta)
                Swal.fire({
                         icon: 'error',
                         title: 'Error',
                         text: 'No se pudo'
                       });
                 
            }
        }
        else{
              Swal.fire({
                         icon: 'error',
                         title: 'Error',
                         text: 'No se pudo eliminar el color'
                       });
        
        }
        
    }
    return(
        <button onClick={handleEliminar} className="hover:underline text-red-400 cursor-pointer">
            <i className="fa-solid fa-trash mr-2"></i>
                Eliminar categoria
        </button>
    )
}