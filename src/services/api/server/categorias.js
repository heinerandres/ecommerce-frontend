import { apiFetch } from "../api";

export async function getCategoria() {
  return apiFetch('/api/categoria', {
    cache: 'no-store'
  });
}


export async function insertarCategoria(data){
  console.log(data);
  return apiFetch('/api/categoria/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}