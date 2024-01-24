import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import '../stylesheets/Sidebar.css';
import Submenu from './Submenu';

const Sidebar = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={2} id="sidebar">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard">
              <Submenu/>
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/invoice">
              Facturacion
            </Nav.Link>
            <Nav.Item>
              <Nav.Link as={Link} to="/settings">
                Consulta de comprobates
              </Nav.Link>
              <Nav.Item>
                <Nav.Link as={Link} to="/settings/general">
                  Notas de Credito
                </Nav.Link>
                <Nav.Link as={Link} to="/settings/security">
                  NC - Financiera
                </Nav.Link>
                <Nav.Link as={Link} to="/settings/security">
                  Recibos de Dinero
                </Nav.Link>
                <Nav.Link as={Link} to="/settings/security">
                  Cierre de Caja
                </Nav.Link>
              </Nav.Item>
            </Nav.Item>
            <Nav.Link as={Link} to="/stats">
              Estadísticas
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
