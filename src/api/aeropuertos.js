
export async function fetchAirports() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + '/aeropuertos');
      if (!response.ok) {
        throw new Error('Error al obtener los aeropuertos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
}