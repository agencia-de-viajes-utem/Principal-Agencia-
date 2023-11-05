export async function fetchPaquetesAPI(origen, destino, fechaInicio, fechaFin) {
    try {
      // Realiza la solicitud a la API utilizando los argumentos proporcionados
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + `/fechapaquetes?origen=${origen}&destino=${destino}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al cargar los paquetes:', error);
      throw error;
    }
  }