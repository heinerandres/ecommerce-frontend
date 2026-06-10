


export default async function InsertarColorPage() {
    let errorMsg = null;

    return(
        <div className="flex justify-center min-h-screen pt-30">
            <div className="w-[20%]">
                Insertar Producto Nuevo
                { errorMsg !== "" &&
                    <span className="text-red-500">
                    {errorMsg}
                    </span>
                }
                {/* <FormInsertarColor /> */}
            </div>
        </div>
    )
}