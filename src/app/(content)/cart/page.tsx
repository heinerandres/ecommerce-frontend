'use server';
import { getColores } from '@/src/services/api/server/colores';
import { CartClient } from '../../components/cart/CartClient';
import { getTallas } from '@/src/services/api/server/tallas';

export default async function CartPage() {

  let errorMsg, colores, tallas  = null;

  const respuestaColores = await getColores();
  if(respuestaColores.ok) colores = respuestaColores.colores;
  else errorMsg = respuestaColores.msg;

  const respuestaTallas = await getTallas();
  if(respuestaTallas.ok) tallas = respuestaTallas.tallas;
  else errorMsg = respuestaTallas.msg;

  return (
    <div className="flex justify-center h-[80vh]">
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <CartClient tallas={ tallas } colores={colores}/>
    </div>
  )
}
