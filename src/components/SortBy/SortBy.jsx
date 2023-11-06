import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SortBy.css';

function SortBy ({ paquetes, setPackages }) {
  
       
      
        // Función para ordenar los paquetes por precio ascendente
        const sortByPriceAsc = () => {
          const sortedPackages = [...paquetes].sort((a, b) => a.pr_total - b.pr_total);
          setPackages(sortedPackages);
        };
      
        // Función para ordenar los paquetes por precio descendente
        const sortByPriceDesc = () => {
          const sortedPackages = [...paquetes].sort((a, b) => b.pr_total - a.pr_total);
          setPackages(sortedPackages);
        };
      
        // Función para ordenar los paquetes por cantidad de servicios
        const sortByServiceCount = () => {
          console.log(packages); // Añade esta línea para verificar la estructura de datos
          const sortedPackages = [...paquetes].sort((a, b) => b.servicios_hh.length - a.servicios_hh.length);
          setPackages(sortedPackages);
        };

          const sortByRating = () => {
            const sortedPackages = [...paquetes].sort((a, b) => a.rating - b.rating);
            setPackages(sortedPackages);
          };
       
      
        

      return(<div>
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