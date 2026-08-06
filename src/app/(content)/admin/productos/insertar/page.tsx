'use server';

import FormInsertarProducto from "@/src/app/components/admin/producto/FormInsertarProducto";
import { getCategorias } from "@/src/services/api/server/categorias";


export default async function InsertarProductoPage() {

    let errorMsg, categorias = null;
    const respuesta = await getCategorias();
    if(respuesta.ok) categorias = respuesta.categorias;
    else errorMsg = respuesta.msg;

    return(
        <div className="flex justify-center w-[80vw] min-h-[82vh] pt-20 ml-10 border-gray-100 shadow-lg rounded-2xl border">
            <div className="w-[35%]">
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