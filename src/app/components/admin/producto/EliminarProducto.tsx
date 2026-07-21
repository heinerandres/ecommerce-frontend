'use client';
import { IProducto } from "@/src/interfaces/producto";
import { eliminarProducto } from "@/src/services/api/server/productos";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


type Props = {
    producto: IProducto | null;
} 

export default function EliminarProducto({producto} : Props) {
    const router = useRouter();

    
    
    const handleEliminar = async() => {
        if(producto?.variantes?.length === 0){
            const respuesta = await eliminarProducto({_id: producto?._id});
    
            if (respuesta.ok) {
              router.push('/admin/productos');
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
                text: 'No puede eliminar productos con variantes asociadas'
            });
        } 
            
    } 
    return(
        <button onClick={handleEliminar} className="hover:underline cursor-pointer">
                Eliminar
        </button>
    )
}