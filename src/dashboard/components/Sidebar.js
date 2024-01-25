// Sidebar.js
import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import '../stylesheets/Sidebar.css';
import Submenu from './Submenu';

const Sidebar = ({ onSidebarClick }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={2} id="sidebar">
          <Nav className="flex-column">
            <Nav.Link>
              <Submenu/>
            </Nav.Link>
            <Nav.Link onClick={() => onSidebarClick('invoice')}>
              Facturacion
            </Nav.Link>
            <Nav.Link onClick={() => onSidebarClick('otro')}>
              Otro Componente
            </Nav.Link>
            {/* Agrega más enlaces según sea necesario */}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;

