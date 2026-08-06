import { apiFetch } from "../api";

export async function getCategorias() {
  return apiFetch('/api/categoria', {
    cache: 'no-store'
  });
}

export async function getCategoriaByNombre(data){
  return apiFetch('/api/categoria/categoriaByNombre', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function insertarCategoria(data){
  return apiFetch('/api/categoria/insertar', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function eliminarCategoria(data){
  return apiFetch('/api/categoria/eliminar', {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function editarCategoria(data){
  return apiFetch('/api/categoria/editar', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}