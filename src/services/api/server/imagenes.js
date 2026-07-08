
import { apiFetch } from "../api";

export async function getImagenesByProducto(data) {
  return apiFetch("/api/imagenes/obtenerImagenesByProducto", {
    method: "POST",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getImagenesByVariante(data) {
  return apiFetch("/api/imagenes/obtenerImagenesByVariante", {
    method: "POST",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getImagenes() {
  return apiFetch("/api/imagenes/", {
    cache: 'no-store',
  });
}

