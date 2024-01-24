import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import '../stylesheets/NavigationBar.css'
import Logo from '../../utils/Logo';

const NavigationBar = () => {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <div className="brand-content">
            <Logo pixel="40px" />
            <h2>SoftPOS</h2>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            <div className='session-content'>
              <h2 className="h2">username</h2>        
              <Button variant="outline-info"> 
                Cerrar Sesión
              </Button>
            </div> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
