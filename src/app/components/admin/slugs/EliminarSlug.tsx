'use client';

import { eliminarSlug } from '@/src/services/api/server/slugs';
import { eliminarTalla } from '@/src/services/api/server/tallas';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

type Props = {
    slug: {_id: string, slug:string, img1:string, img2:string, img3:string, img4:string, categoria:string, cantidadProductos:number} | null;
}

export default function EliminarSlug({slug} : Props) {
    const router = useRouter();
    
    const handleEliminar = async() => {
        if((slug?.cantidadProductos ?? 0) === 0){
            const respuesta = await eliminarSlug({_id: slug?._id});
            if (respuesta.ok) router.push('/admin/slugs');
            else {
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
                Eliminar slug
        </button>
    )
}