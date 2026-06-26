import FormEditarCategoria from "@/src/app/components/admin/categoria/FormEditarCategoria";
import { getCategoriaByNombre } from "@/src/services/api/server/categorias";

interface Props {
    params: {
        nombre: string;
    }
}

export default async function EditarCategoriaPage( { params }: Props ) {
    const _params = await params;
    let errorMsg = null;
    let categoria: {_id: string, nombre:string} | null = null;

    const respuestaCategoria= await getCategoriaByNombre({nombre: _params.nombre});
        if (respuestaCategoria.ok) {
          categoria = respuestaCategoria.nombre;
        } else {
          errorMsg = respuestaCategoria.msg;
        }
    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[20%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormEditarCategoria categoria ={categoria} />
            </div>
        </div>
    )
}