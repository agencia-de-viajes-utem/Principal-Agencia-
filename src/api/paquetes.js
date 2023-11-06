export const apiCall = async (path, method, body) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // El cuerpo de la solicitud, que debe ser un objeto JSON
    });

    if (res.ok) {
      const data = await res.json();
      return data; // Devuelve los datos de la respuesta
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message); // Lanza un error si la respuesta no es exitosa
    }
  } catch (error) {
    throw error; // Lanza un error si hay un error en la solicitud
  }
};
