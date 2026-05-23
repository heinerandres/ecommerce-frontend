import Link from "next/link";

export default function(){
    return(
        <div className="flex justify-center items-center h-200">

            <i className="text-6xl fa-solid fa-cart-shopping"></i>

            <div className="flex flex-col items-center">
                <h1 className="text-2xl ml-5 font-semibold">Carrito Vacío</h1>
                <Link href="/" className="text-blue-500 mt-2 ml-5 text-4xl">
                    Regresar
                </Link>

            </div>

        </div>
    );
}