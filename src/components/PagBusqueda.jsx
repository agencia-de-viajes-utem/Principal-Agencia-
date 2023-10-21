import React from 'react';
import Filtros from './Filtros';
import SortBy from './SortBy'
import "../App.css"
import "../styles/PagBusqueda.css";
import CurrentSearch from './CurrentSearch.jsx'

function PagBusqueda() {

    return(
        <div>
            <div className='d-flex justify-content-center align-items-center mb-4'> <CurrentSearch/> </div>
        <div className='PagBusqueda'>
            
            <div className='sidebar'>
                <Filtros/>
            </div>
            <div className='body'>
                <h1>Body</h1>
                <SortBy  />
            </div>
        </div>
        </div>
    )
}

export default PagBusqueda;