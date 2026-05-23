import { CartClient } from '../../components/cart/CartClient';
import { getGeneralInformation } from '@/src/utilities/getGeneralInfo';


export default async function CartPage() {
  const {productos, tallas, colores, errorMsg} = await getGeneralInformation(null, false);

  return (
    <div className="flex justify-center h-[80vh]">
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <CartClient tallas={ tallas } colores={colores}/>
    </div>
  )
}
