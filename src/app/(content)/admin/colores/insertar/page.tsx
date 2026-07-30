
import FormInsertarColor from "@/src/app/components/admin/colores/FormInsertarColor";
import { getColorByNombre } from "@/src/services/api/server/colores";


export default async function InsertarColorPage() {
    let errorMsg = null;

    return(
        <div className="flex justify-center w-[80vw] min-h-[82vh] pt-40 mt-5 ml-10 border-gray-100 shadow-lg rounded-2xl border">
            <div className="w-[30%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormInsertarColor />
            </div>
        </div>
    )
}