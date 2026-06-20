
import { apiFetch } from "../api";

export async function getImagenesByProducto(data) {
  console.log(data);
  return apiFetch("/api/imagenes/obtenerImagenesByProducto", {
    method: "POST",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data}),
  });
}