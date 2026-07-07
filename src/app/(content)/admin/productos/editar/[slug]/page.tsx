import FormEditarProducto from "@/src/app/components/admin/producto/FormEditarProducto";
import { IProducto } from "@/src/interfaces/producto";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getProductoBySlug } from "@/src/services/api/server/productos";

interface Props {
    params: {
        slug: string;
    }
}

export default async function EditarProductoPage( { params }: Props ) {
    const _params = await params;
    let errorMsg, categorias = null;
    let producto: IProducto | null = null;

    const respuestaProducto = await getProductoBySlug(_params.slug);
    if(respuestaProducto.ok) producto = respuestaProducto.producto;
    else errorMsg = respuestaProducto.msg;

    const respuesta = await getCategorias();
    if(respuesta.ok) categorias = respuesta.categorias;
    else errorMsg = respuesta.msg;

    return(
        <div className="flex justify-center min-h-screen pt-10">
            <div className="w-[20%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormEditarProducto producto={producto} categorias={categorias} />
            </div>
        </div>
    )
}