import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import "../styles/navBar.css"
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/fonts.css';

function NavBar() {
    return (
        <Navbar expand="md" style={{background:"#023047"}}>
            <div className='container-xl'>
                <Navbar.Brand className="container-logo" href='#'>
                    <i className="bi bi-globe-americas" style={{ color: "#FB8500" }}></i>
                    <span style={{color:"#FB8500", marginLeft:"7px"}}>Logo</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="menu" />
                <Navbar.Collapse id="menu">
                    <Nav className="me-auto">
                        <Nav.Link className='link-izq' href="">
                            <i className="bi bi-briefcase-fill"></i> Paquetes
                        </Nav.Link>
                        <Nav.Link className='link-izq' href="">
                            <i className="bi bi-info-circle-fill"></i> Ayuda
                        </Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link className="btn" href="">
                                <i className="bi bi-person-circle"></i> Ingresar
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavBar;
