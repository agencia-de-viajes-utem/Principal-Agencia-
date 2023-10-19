import React from 'react';
import Filtros from './Filtros';
import SortBy from './SortBy'
import "../App.css"
import "../styles/PagBusqueda.css";

function PagBusqueda() {

    return(
        <div className='PagBusqueda'>
            <div className='sidebar'>
                <Filtros/>
            </div>
            <div className='body'>
                <h1>Body</h1>
                <SortBy  />
            </div>
        </div>
    )
}

export default PagBusqueda;