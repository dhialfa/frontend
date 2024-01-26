import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../stylesheets/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 SoftPOS. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
