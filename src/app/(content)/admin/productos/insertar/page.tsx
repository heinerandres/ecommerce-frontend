'use server';

import FormInsertarProducto from "@/src/app/components/admin/producto/FormInsertarProducto";


export default async function InsertarProductoPage() {
    let errorMsg = null;

    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[21%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormInsertarProducto />
            </div>
        </div>
    )
}