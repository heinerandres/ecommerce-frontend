import FormInsertarCategoria from "@/src/app/components/admin/categoria/FormInsertarCategoria";



export default async function InsertarCategoriaPage() {
    let errorMsg = null;

    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[20%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormInsertarCategoria/>
            </div>
        </div>
    )
}