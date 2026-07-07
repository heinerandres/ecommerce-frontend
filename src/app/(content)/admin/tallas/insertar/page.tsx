import FormInsertarTalla from "@/src/app/components/admin/tallas/FormInsertarTalla";

export default async function InsertarTallaPage() {
    let errorMsg = null;

    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[20%]">
                { errorMsg !== "" && <span className="text-red-500"> {errorMsg} </span>}
                <FormInsertarTalla />
            </div>
        </div>
    )
}