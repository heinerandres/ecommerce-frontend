export async function apiFetch(endpoint, options = {}) {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {

  try{
    const res = await fetch(`http://localhost:4000${endpoint}`, {
      ...options,
      headers: {
        ...options.headers
      }
    });
    return res.json();
  }
  catch(error){
    console.log(error);
    return {
      ok: false,
      msg: "ConexiÃ³n no disponible, por favor hable con el administrador"
    };
  }
}