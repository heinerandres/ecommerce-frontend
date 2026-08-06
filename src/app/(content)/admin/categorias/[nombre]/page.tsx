import FormEditarCategoria from "@/src/app/components/admin/categorias/FormEditarCategoria";
import FormEditarTalla from "@/src/app/components/admin/tallas/FormEditarTalla";
import { getCategoriaByNombre } from "@/src/services/api/server/categorias";
import { getTallaByValor } from "@/src/services/api/server/tallas";

interface Props {
    params: {
        nombre: string;
    }
}

export default async function EditarCategoria( { params }: Props ) {
    const _params = await params;
    let errorMsg = null;
    let categoria: {_id: string, nombre:string} | null = null;

    const respuesta = await getCategoriaByNombre({nombre: _params.nombre});
    console.log(respuesta);
        if (respuesta.ok) categoria = respuesta.categoria;
        else errorMsg = respuesta.msg;
    return(
        <div className="flex justify-center w-[80vw] min-h-[82vh] pt-40 mt-5 ml-10 border-gray-100 shadow-lg rounded-2xl border">
            <div className="w-[30%]">
                { errorMsg !== "" && <span className="text-red-500"> {errorMsg} </span> }
                <FormEditarCategoria categoria={categoria} />
            </div>
        </div>
    )
}