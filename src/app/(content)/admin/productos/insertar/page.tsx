'use server';

import FormInsertarProducto from "@/src/app/components/admin/producto/FormInsertarProducto";
import { getCategorias } from "@/src/services/api/server/categorias";


export default async function InsertarProductoPage() {

    let errorMsg, categorias = null;
    const respuesta = await getCategorias();
    if(respuesta.ok) categorias = respuesta.categorias;
    else errorMsg = respuesta.msg;

    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[21%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormInsertarProducto 
                    categorias={categorias}/>
            </div>
        </div>
    )
}