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

export async function editarCategoria(data){
  console.log(data);
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
   console.log("Hola")
   
  return apiFetch('/api/categoria/categoriaByNombre', {
    
    method: 'POST',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  console.log("Hola")
 
}