import { getProductosConImagenes } from '@/src/services/api/server/productos';
import FormInsertarPedidoEnTienda from '../../../../../components/admin/pedidos/enTienda/FormInsertarPedidoEnTienda';
import { IProducto } from '@/src/interfaces/producto';

let productos : IProducto[] | null = null;

export default async function InsertarPedidoEnTiendaPage() {
    let errorMsg = null;
    const respuestaProductos = await getProductosConImagenes();
    if(respuestaProductos.ok) productos = respuestaProductos.productos;
    else errorMsg = respuestaProductos.msg;

    console.log(respuestaProductos);

    return(
        <div className="flex w-[80vw] min-h-[82vh] py-10 mt-5 ml-10 border-gray-100 shadow-lg rounded-2xl border">
                { errorMsg !== "" && <span className="text-red-500"> {errorMsg} </span>}
                <FormInsertarPedidoEnTienda productos={productos} />
        </div>
    )
}