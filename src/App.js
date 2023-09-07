import React from 'react';
import './App.css';
import FlightSearch from './components/FlightSeact';
import NavBar from './components/navBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <FlightSearch />
    </div>
  );
}

export default App;
