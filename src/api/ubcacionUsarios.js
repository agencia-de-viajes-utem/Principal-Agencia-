export async function UbicacionUsario(){

    try{ 
        
        const apiUrl= 'https://freeipapi.com/api/json'
        const response = await fetch(apiUrl)
        if  (!response.ok){
            throw new Error('Error en la solicitud')
        }

        const data = await response.json()
        return data 
    } catch(error){
        console.error('Error al cargar los paquetes:', error);
        throw error;
    }
}