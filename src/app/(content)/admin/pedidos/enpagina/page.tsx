import TablaPedidos from "@/src/app/components/admin/pedidos/enPagina/tablaPrincipal/TablaPedidos";
import { IPedido } from "@/src/interfaces/pedido";
import { getPedidos } from "@/src/services/api/server/pedidos";


export default async function EnPagina() {

    let errorMsg = null;
    let pedidos : IPedido[] | null = null;

    const respuestaProductos = await getPedidos();
    if(respuestaProductos.ok) pedidos = respuestaProductos.pedidos;
    else errorMsg = respuestaProductos.msg;

  return (
    <div className="admin-div-principal">
      <div className="flex justify-between h-15">
        <div className="flex items-center">
          <div className="div-icono">
            <i className="fa-solid fa-cloud text-xl text-blue-700"></i>
          </div>
          <div className="ml-4">
            <h5 className="text-2xl font-medium">Pedidos en la página</h5>
            <h3 className="text-gray-400">Gestiona los pedidos realizados en la página.</h3>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <TablaPedidos pedidos = { (pedidos?? []).filter(p=> p.tipoPedido === "EnPagina") } />
      </div>
    </div>
  );
}