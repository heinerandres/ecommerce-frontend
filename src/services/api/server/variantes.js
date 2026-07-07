import { apiFetch } from "../api";

export async function getVariantes() {
  return apiFetch('/api/variantes', {
    cache: 'no-store'
  });
}

export async function insertarVariante(data) {
  return apiFetch('/api/variantes/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}


export async function editarVariante(data) {
  return apiFetch('/api/variantes/editar', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function eliminarVariante(data){
  return apiFetch('/api/variantes/eliminar', {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function getVariantesByProducto(data){
  return apiFetch('/api/variantes/getVariantesByProducto', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}