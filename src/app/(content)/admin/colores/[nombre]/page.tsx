import FormEditarColor from "@/src/app/components/admin/colores/FormEditarColor";
import { getColorByNombre } from "@/src/services/api/server/colores";

interface Props {
    params: {
        nombre: string;
    }
}

export default async function EditarColorPage( { params }: Props ) {
    const _params = await params;
    let errorMsg = null;
    let color: {_id: string, nombre:string, valor:string} | null = null;

    const respuestaColor = await getColorByNombre({nombre: _params.nombre});
        if (respuestaColor.ok) {
          color = respuestaColor.color;
        } else {
          errorMsg = respuestaColor.msg;
        }
    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[20%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormEditarColor color={color} />
            </div>
        </div>
    )
}