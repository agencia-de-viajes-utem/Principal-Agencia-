import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import "../styles/navBar.css"
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/fonts.css';

function NavBar() {
    return (
        <Navbar expand="md" className='navbar-lighter' style={{background:"#023047"}}>
            <div className='container-xl'>
                <Navbar.Brand href='/'>
                    <img src="/logo.png" alt="logo" className='logo'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="menu" className='btn-colapse'/>
                <Navbar.Collapse id="menu">
                    <Nav className="me-auto justify-content-center">
                        <Nav.Link className='link-izq d-flex justify-content-center' href="">
                            <i className="bi bi-briefcase-fill"></i> Paquetes
                        </Nav.Link>
                        <Nav.Link className='link-izq d-flex justify-content-center' href="">
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
