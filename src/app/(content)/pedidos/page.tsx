'use server';


import TablaPedidosCliente from '../../components/pedidos/tabla/TablaPedidosCliente';

export default async function PedidosCliente() {

  
  return (
    <div className="min-h-[70vh]">
      <h5 className="mt-10 ml-20 text-2xl font-bold">Pedidos</h5>
      <div className="mt-10 px-20">
        <TablaPedidosCliente />
      </div>
    </div>
  );
}