import { apiFetch } from "../api";

export async function getProductos() {
  return apiFetch('/api/producto', {
    cache: 'no-store'
  });
}

export async function getProductoBySlug(slug) {
  console.log(slug);
  return apiFetch("/api/producto/obtenerProductoBySlug", {
    method: "POST",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({slug}),
  });
}

export async function createProducto(data) {
  return apiFetch('/api/producto/insertar', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}