import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getCedula } from '../../../api/hacienda.cedulas.api';

const CreateClientModal = ({ show, handleClose }) => {
  const [newClient, setNewClient] = useState({ 
    cedula: '',
    nombre: '',
    email: ''
  });

  const handleFieldChange = (fieldName, value) => {
    setNewClient({ ...newClient, [fieldName]: value });
  };

  const loadCedula = async () => {
    try {
      const res = await getCedula(newClient.cedula);
      setNewClient({ ...newClient, nombre: res.data.nombre });
    } catch (error) {
      console.error('Error al cargar nombre:', error);
    }
  };

  const handleCreateClient = () => {
    handleClose();
  };

  useEffect(() => {
    if (newClient.cedula) {
      loadCedula();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newClient.cedula]);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campos de creación */}
          <Form.Group controlId="formCedula">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              type="text"
              value={newClient.cedula}
              onChange={(e) => handleFieldChange('cedula', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={newClient.nombre}
              onChange={(e) => handleFieldChange('nombre', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newClient.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
          </Form.Group>
          {/* Agrega más campos según tus necesidades */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleCreateClient}>
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateClientModal;

