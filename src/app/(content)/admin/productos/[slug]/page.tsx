import FormEditarProducto from "@/src/app/components/admin/producto/FormEditarProducto";
import { IProducto } from "@/src/interfaces/producto";
import { getProductoBySlug } from "@/src/services/api/server/productos";





interface Props {
    params: {
        slug: string;
    }
}

export default async function EditarProductoPage( { params }: Props ) {
    const _params = await params;
    let errorMsg = null;
    let producto: IProducto[] | null = null;

    const respuesta = await getProductoBySlug(_params.slug);
        if (respuesta.ok) {
          console.log(respuesta);
          producto = respuesta.producto;
        } else {
          errorMsg = respuesta.msg;
        }
    return(
        <div className="flex justify-center min-h-screen pt-10">
            <div className="w-[20%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormEditarProducto productoA={producto} />
            </div>
        </div>
    )
}