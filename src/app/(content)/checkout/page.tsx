
'use server';
import { CheckoutCartClient } from "../../components/checkout/CheckoutCartClient";

export default async function CheckoutCartPage() {

  return (
    <div className="flex justify-center h-[80vh] md:text-sm 2xl:text-lg">
        <CheckoutCartClient />
    </div>
  )
}