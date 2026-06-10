export async function apiFetch(endpoint, options = {}) {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
  const res = await fetch(`http://localhost:4000${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!res.ok) {
    console.log('Error en la petición');
  }

  return res.json();
}