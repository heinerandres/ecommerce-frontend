import { apiFetch } from "../api";

export async function getProductos() {
  return apiFetch('/api/producto', {
    cache: 'no-store'
  });
}

export async function getProductosConImagenes() {
  return apiFetch('/api/producto/productosConImagenes', {
    cache: 'no-store'
  });
}

export async function getProductoBySlug(slug) {
  return apiFetch("/api/producto/obtenerProductoBySlug", {
    method: "POST",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({slug}),
  });
}

export async function insertarProducto(data) {
  return apiFetch('/api/producto/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function editarProductoConImagenes(data){
  return apiFetch('/api/producto/editarProductoConImagenes', {
    method: 'PUT',
    cache: 'no-store',
    body: data
  });
}

export async function editarProducto(data) {
  return apiFetch('/api/producto/editar', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function eliminarProducto(data){
  return apiFetch('/api/producto/eliminar', {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}