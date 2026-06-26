import FormInsertarSlug from "@/src/app/components/admin/slugs/FormInsertarSlug";


export default async function InsertarSlugPage() {
    let errorMsg = null;

    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[20%]">
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                <FormInsertarSlug />
            </div>
        </div>
    )
}