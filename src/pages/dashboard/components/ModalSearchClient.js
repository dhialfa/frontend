// ClientModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

const ModalSearchClient = ({ show, handleClose, clients }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = clients.filter((client) => {
      return (
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.cedula.includes(searchTerm)
      );
    });

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Lista de Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Buscar por nombre o cédula"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ListGroup>
          {filteredClients.map((client) => (
            <ListGroup.Item key={client.id}>
              {client.nombre} - {client.cedula}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSearchClient;
