import FormInsertarCategoria from "@/src/app/components/admin/categorias/FormInsertarCategoria";

export default async function InsertarCategoriaPage() {
    let errorMsg = null;

    return(
        <div className="flex justify-center w-[80vw] min-h-[82vh] pt-40 ml-10 border-gray-100 shadow-lg rounded-2xl border">
            <div className="w-[30%]">
                { errorMsg !== "" && <span className="text-red-500"> {errorMsg} </span>}
                <FormInsertarCategoria />
            </div>
        </div>
    )
}