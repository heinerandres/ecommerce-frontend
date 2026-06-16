import { apiFetch } from "../api";

export async function getTallas() {
  return apiFetch('/api/talla', {
    cache: 'no-store'
  });
}

export async function getTallaByValor(data){
  console.log(data)
  return apiFetch('/api/talla/tallaByValor', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function editarTalla(data){
  console.log(data);
  return apiFetch('/api/talla/editar', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function insertarTalla(data){
  console.log(data);
  return apiFetch('/api/talla/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function eliminarTalla(data){
  console.log(data);
  return apiFetch('/api/talla/eliminar', {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}
