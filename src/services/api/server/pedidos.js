import { apiFetch } from "../api";

export async function colocarOrden(data) {
  return apiFetch('/api/pedidos/colocarOrden', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}