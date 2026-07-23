import { apiFetch } from "../api";

export async function insertarDireccion(data){
  return apiFetch('/api/direccion/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function obtenerDireccion(data){
  return apiFetch('/api/direccion/obtenerDireccion', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function editarDireccion(data){
  return apiFetch('/api/direccion/editar', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}