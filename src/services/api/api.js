export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`http://localhost:4000${endpoint}`, {
    ...options,
    headers: {
      ...options.headers
    }
  });


  if (!res.ok) {
    console.log('Error en la petición');
  }

  return res.json();
}