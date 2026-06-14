import FormEditarSlug from "@/src/app/components/admin/slugs/FormEditarSlug";
import { getCategorias } from "@/src/services/api/server/categorias";
import { getSlugBySlug } from "@/src/services/api/server/slugs";



interface Props {
    params: {
        slug: string;
    }
}

export default async function EditarTallaPage( { params }: Props ) {
    const _params = await params;
    let errorMsg = null;
    let slug: {_id: string, slug:string, img1:string, img2:string, img3:string, img4:string, categoria:string, cantidadProductos:number} | null = null;
    let categorias: {_id:string, nombre:string}[] | null = null;

    const respuesta = await getSlugBySlug({slug: _params.slug});
    if (respuesta.ok) slug = respuesta.slug;
    else errorMsg = respuesta.msg;

    const respuestaCategoria = await getCategorias();
    if (respuestaCategoria.ok) categorias = respuestaCategoria.categorias;
    else errorMsg = respuestaCategoria.msg;
    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[25%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormEditarSlug _slug={slug} categorias={categorias} /> 
            </div>
        </div>
    )
}