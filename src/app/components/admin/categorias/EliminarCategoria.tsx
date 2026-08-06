'use client';

import { eliminarCategoria } from '@/src/services/api/server/categorias';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

type Props = {
    categoria: {_id: string, nombre:string, cantidadProductos:number} | null;
}

export default function EliminarCategoria({categoria} : Props) {
    const router = useRouter();
    const handleEliminar = async() => {
        if((categoria?.cantidadProductos ?? 0) === 0){
            const respuesta = await eliminarCategoria({_id: categoria?._id});
            if (respuesta.ok) router.push('/admin/categorias');
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar la categoría'
                });
            }
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No pueden eliminar categorias con productos asociados'
            });
        } 
    }
    return(
        <button onClick={handleEliminar} className="hover:underline cursor-pointer">
                Eliminar
        </button>
    )
}