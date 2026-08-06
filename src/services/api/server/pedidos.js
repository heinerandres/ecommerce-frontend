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

export async function getPedidos() {
  return apiFetch('/api/pedidos', {
    cache: 'no-store'
  });
}

export async function getPedidosCliente(data) {
  return apiFetch('/api/pedidos/obtenerPedidosCliente', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function colocarPedidoEnTienda(data) {
  return apiFetch('/api/pedidos/colocarPedidoEnTienda', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function actualizarEstadoPedido(data) {
  return apiFetch('/api/pedidos/actualizarEstadoPedido', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}