// DashboardPage.js
import React, { useState } from 'react';
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
import Invoice from "./components/Invoice";
import { Container, Row, Col } from 'react-bootstrap';
import Client from './components/Client';

const DashboardPage = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const renderComponent = (component) => {
    switch (component) {
      case 'invoice':
        return <Invoice />;
      case 'clients':
          return <Client />;
      default:
        return null;
    }
  };

  const handleSidebarClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div>
      <NavigationBar />
      <Container fluid>
        <Row>
          <Col xs={12} md={2}>
            <Sidebar onSidebarClick={handleSidebarClick} />
          </Col>
          <Col xs={12} md={10}>
            {renderComponent(currentComponent)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
