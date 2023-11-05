export async function fetchPaquetesAPI(origen, destino, fechaInicio, fechaFin, personas) {
    try {
      // Crea un objeto JSON con los filtros
      const filters = {
        origen,
        destino,
        fechaInicio,
        fechaFin,
        personas,
      };
  
      // Realiza la solicitud a la API utilizando JSON en el cuerpo de la solicitud
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + '/fechapaquetes', {
        method: 'POST',  // Cambia el método a POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),  // Convierte el objeto filters a JSON
      });
  
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
  