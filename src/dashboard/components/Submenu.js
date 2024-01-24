import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Submenu = () => {
  return (
    <NavDropdown title="Herramientas" id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} to="/dashboard/item1">
        Item 1
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/dashboard/item2">
        Item 2
      </NavDropdown.Item>
      {/* Agrega más items según tus necesidades */}
    </NavDropdown>
  );
};

export default Submenu;
