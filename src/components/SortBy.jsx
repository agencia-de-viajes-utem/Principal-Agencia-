import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sortby.css'

function SortBy () {
  
        const [packages, setPackages] = useState(['']);
      
        // Función para ordenar los paquetes por precio ascendente
        const sortByPriceAsc = () => {
          const sortedPackages = [...packages].sort((a, b) => a.price - b.price);
          setPackages(sortedPackages);
        };
      
        // Función para ordenar los paquetes por precio descendente
        const sortByPriceDesc = () => {
          const sortedPackages = [...packages].sort((a, b) => b.price - a.price);
          setPackages(sortedPackages);
        };
      
        // Función para ordenar los paquetes por cantidad de servicios
        const sortByServiceCount = () => {
          console.log(packages); // Añade esta línea para verificar la estructura de datos
          const sortedPackages = [...packages].sort((a, b) => b.services.length - a.services.length);
          setPackages(sortedPackages);
        };

          const sortByRating = () => {
            const sortedPackages = [...packages].sort((a, b) => a.rating - b.rating);
            setPackages(sortedPackages);
          };
       
      
        

        return(<div className="mt-2 mx-2" style={{ width:'60%'}}>
                    <div class="btn-group" role="group">
        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Ordenar Por
        </button>
        <ul class="dropdown-menu">
        <button type="button" class="btn btn- w-100" onClick={sortByPriceAsc}>Precio (Asc)</button>
        <button type="button" class="btn btn- w-100" onClick={sortByPriceDesc}>Precio (Des)</button>
        <button type="button" class="btn btn- w-100" onClick={sortByServiceCount}>Servicios</button>
        <button type="button" class="btn btn- w-100" onClick={sortByRating}>Valoracion</button>
        </ul>
    </div>
    
   
        </div>);





}

export default SortBy;