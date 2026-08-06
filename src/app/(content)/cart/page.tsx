'use server';
import { getColores } from '@/src/services/api/server/colores';
import { CartClient } from '../../components/cart/CartClient';
import { getTallas } from '@/src/services/api/server/tallas';

export default async function CartPage() {

  return (
    <div className="flex justify-center h-[80vh]">
      <CartClient/>
    </div>
  )
}
