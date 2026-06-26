import { apiFetch } from "../api";

export async function getCategoria() {
  return apiFetch('/api/categoria', {
    cache: 'no-store'
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

export async function getCategoriaByNombre(data){
   
   
  return apiFetch('/api/categoria/obtenerCategoriaByNombre', {
    
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
 
 
}


export async function eliminarCategoria(data){

  
   console.log(data)
  return apiFetch('/api/categoria/eliminarCategoria', {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

