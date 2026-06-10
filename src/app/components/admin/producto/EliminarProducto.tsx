/* import { eliminarColor } from '@/src/services/api/server/colores';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';*/

import { IProducto } from "@/src/interfaces/producto";

type Props = {
    producto: IProducto | null;
} 

export default function EliminarProducto({producto} : Props) {
    /* const router = useRouter();
    
    const handleEliminar = async() => {
        if((color?.cantidadProductos ?? 0) === 0){
            const respuesta = await eliminarColor({_id: color?._id});
    
            if (respuesta.ok) {
              router.push('/admin/colores');
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
            
    } */
    return(
        <button className="hover:underline text-red-400 cursor-pointer">
            <i className="fa-solid fa-trash mr-2"></i>
                Eliminar producto
        </button>
    )
}