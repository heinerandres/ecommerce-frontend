'use client';
/* import { eliminarColor } from '@/src/services/api/server/colores';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';*/

import { IProducto } from "@/src/interfaces/producto";
import { IVariante } from "@/src/interfaces/variante";
import { eliminarVariante } from "@/src/services/api/server/variantes";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


type Props = {
    variante: IVariante;
    producto: IProducto | null;
} 

export default function EliminarVariante({variante, producto} : Props) {
    const router = useRouter();
    
    const handleEliminar = async() => {
        if(variante){
            const respuesta = await eliminarVariante({_id: variante._id});
    
            if (respuesta.ok) {
              router.push(`/admin/productos/variantes/${producto?.slug}`);
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
                Eliminar variante
        </button>
    )
}