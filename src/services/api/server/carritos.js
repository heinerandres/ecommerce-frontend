import { apiFetch } from "../api";

export async function getCarrito(usuario_id) {
  return apiFetch("/api/carrito/obtenerCarrito", {
    method: "POST",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({usuario_id,}),
  });
}

export async function getCarritos() {
  return apiFetch(`/api/carrito/`);
}

export async function crearCarrito(data){
  return apiFetch('/api/carrito/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}
export async function agregarProductoCarrito(data){
  return apiFetch('/api/carrito/insertarProducto', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function obtenerProductosCarrito(data) {
  return apiFetch('/api/carrito/obtenerProductosCarrito', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
} 