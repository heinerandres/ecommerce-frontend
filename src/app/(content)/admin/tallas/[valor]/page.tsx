
import FormEditarTalla from "@/src/app/components/admin/tallas/FormEditarTalla";
import { getTallaByValor } from "@/src/services/api/server/tallas";

interface Props {
    params: {
        valor: string;
    }
}

export default async function EditarTallaPage( { params }: Props ) {
    const _params = await params;
    let errorMsg = null;
    let talla: {_id: string, valor:string} | null = null;

    const respuesta = await getTallaByValor({valor: _params.valor});
        if (respuesta.ok) talla = respuesta.talla;
        else errorMsg = respuesta.msg;
    return(
        <div className="flex justify-center w-[80vw] min-h-[82vh] pt-40 mt-5 ml-10 border-gray-100 shadow-lg rounded-2xl border">
            <div className="w-[30%]">
                { errorMsg !== "" && <span className="text-red-500"> {errorMsg} </span> }
                <FormEditarTalla talla={talla} />
            </div>
        </div>
    )
}