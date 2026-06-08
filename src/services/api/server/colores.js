import { apiFetch } from "../api";

export async function getColores() {
  return apiFetch('/api/color', {
    cache: 'no-store'
  });
}

export async function getColorByNombre(data){
  return apiFetch('/api/color/colorByNombre', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function editarColor(data){
  console.log(data);
  return apiFetch('/api/color/editar', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function insertarColor(data){
  console.log(data);
  return apiFetch('/api/color/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}