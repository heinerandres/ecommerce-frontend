import { apiFetch } from "../api";

export async function getSlugs() {
  return apiFetch('/api/slug', {
    cache: 'no-store'
  });
}

export async function getSlugBySlug(data){
  return apiFetch('/api/slug/slugBySlug', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function editarSlug(data){
  console.log(data);
  return apiFetch('/api/slug/editar', {
    method: 'PUT',
    cache: 'no-store',
    body: data
  });
}

export async function insertarSlug(data){
  console.log(data);
  return apiFetch('/api/slug/insertar', {
    method: 'POST',
    cache: 'no-store',
    body: data
  });
}

export async function eliminarSlug(data){
  console.log(data);
  return apiFetch('/api/slug/eliminar', {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}
