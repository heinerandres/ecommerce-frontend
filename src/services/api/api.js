export async function apiFetch(endpoint, options = {}) {
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {

  try{
    const res = await fetch(`https://ecommerce-back-gbe4fndmdxfdctab.canadacentral-01.azurewebsites.net${endpoint}`, {
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
      msg: "Conexión no disponible, por favor hable con el administrador"
    };
  }
}
