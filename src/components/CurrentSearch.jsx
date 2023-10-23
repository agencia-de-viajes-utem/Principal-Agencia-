import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillAirplaneFill, BsFillCalendarCheckFill, BsFillPeopleFill } from "react-icons/bs";
import 'react-calendar/dist/Calendar.css';
import "./CurrentSearch.css"

const CurrentSearch = (props) => {


    
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const { origen, destino, selectedDates, selectedMonth } = props;
 


const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
};


  return (
        <div className="row d-flex flex-column " style={{backgroundColor: "#023047", color: "White", borderRadius: "20px", width: '80%'}}>
          <div className="col">
            <div className='d-flex flex-column'>
              <div className="d-flex flex-wrap mb-1">
              <p className="card-text  justify-content-start mr-2 mt-3 mb-2 col-sm-12 col-md-6 col-lg-3" style={{  }}>
              <BsFillAirplaneFill className='mb-3 mx-2' style={{ width: "2rem", height: "2rem", rotate: "45deg" }} /> <h3>Origen</h3>
              {origen.map(item => (
                <p className='d-flex'>{item.aeropuerto}</p>
              ))}
              </p>
                <p className="card-text justify-content-start mt-3 mb-2 mx-auto col-sm-12 col-md-6 col-lg-3 " style={{  marginRight: "0px" }}>
                  <BsFillAirplaneFill className='mb-3' style={{ width: "2rem", height:"2rem",  rotate: "120deg" }}/><h3>Destino</h3>
                  {destino.map(item => (
                  <p className='d-flex'>{item.aeropuerto}</p>
                  ))}
                </p>
                <p className="card-text mx-1 justify-content-start mt-3 mb-2 col-sm-12 col-md-6 col-lg-2" style={{  marginRight: "80px" }}>
                  <BsFillCalendarCheckFill className = 'mb-3' style={{ width: "2rem", height:"2rem", marginRight:""}}/> <h3>Fechas</h3>
                  {selectedDates.length === 2
                    ? `${formatDate(selectedDates[0])} - ${formatDate(
                        selectedDates[1]
                      )}`
                    : selectedDates.length === 1
                    ? formatDate(selectedDates[0])
                    : selectedMonth}
                </p>
                <p className="card-text justify-content-start mt-3 mb-2 mx-4 col-sm-12 col-md-6 col-lg-2">
                <BsFillPeopleFill className='mb-3' style={{ width: "2rem", height:"2rem", marginLeft:"10px"}}/> <h2>Personas</h2> {numberOfPeople}
                </p>
              </div>
            </div>
          </div>
        </div>
    
  );
}

export default CurrentSearch;
