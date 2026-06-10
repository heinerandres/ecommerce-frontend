'use client';

import { eliminarTalla } from '@/src/services/api/server/tallas';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

type Props = {
    talla: {_id: string, valor:string, cantidadProductos:number} | null;
}

export default function EliminarTallas({talla} : Props) {
    const router = useRouter();
    
    const handleEliminar = async() => {
        if((talla?.cantidadProductos ?? 0) === 0){
            const respuesta = await eliminarTalla({_id: talla?._id});
    
            if (respuesta.ok) {
              router.push('/admin/tallas');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el color'
                });
            }
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No puede eliminar colores con productos asociados'
            });
        }
            
    }
    return(
        <button onClick={handleEliminar} className="hover:underline text-red-400 cursor-pointer">
            <i className="fa-solid fa-trash mr-2"></i>
                Eliminar talla
        </button>
    )
}