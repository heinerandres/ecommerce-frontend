import TablaPedidos from "@/src/app/components/admin/pedidos/enTienda/tablaPrincipal/TablaPedidos";
import { IPedido } from "@/src/interfaces/pedido";
import { getPedidos } from "@/src/services/api/server/pedidos";
import Link from "next/link";

export default async function EnTienda() {
   let errorMsg = null;
     let pedidos : IPedido[] | null = null;
 
   const respuestaPedidos = await getPedidos();
     if(respuestaPedidos.ok) pedidos = respuestaPedidos.pedidos;
     else errorMsg = respuestaPedidos.msg;
 
   return (
     <div className="min-h-[82vh] mt-5 w-[80vw] border ml-10 border-gray-100 shadow-lg rounded-2xl">
       <div className="flex justify-between mt-10 h-15">
         <div className="flex ml-20 items-center">
           <div className="flex items-center justify-center w-18 h-full bg-blue-200 rounded-xl">
             <i className="fa-solid fa-store text-xl text-blue-700"></i>
           </div>
           <div className="ml-4">
             <h5 className="text-2xl font-medium">Pedidos en la tienda</h5>
             <h3 className="text-gray-400">Gestiona los pedidos realizados en la tienda.</h3>
           </div>
         </div>
         <Link href="/admin/pedidos/entienda/insertar" 
            className="flex items-center mr-20 px-3 bg-blue-700 text-white rounded-lg cursor-pointer">
              <i className="fa-solid fa-plus mr-2"></i>
              {/* <i className="fa-solid fa-paintbrush ml-2"></i>
              <i className="fa-solid fa-palette mr-2"></i> */}
              Agregar Pedido Nuevo
          </Link>
       </div>
       <div className="mt-10 px-19">
         {errorMsg && <p className="text-red-500">{errorMsg}</p>}
         <TablaPedidos pedidos = { (pedidos?? []).filter(p=> p.tipoPedido === "EnTienda") } />
       </div>
     </div>
  )
}