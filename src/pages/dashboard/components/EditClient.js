import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateClient } from '../../../api/client.api';

const EditClient = ({ show, handleClose, client }) => {
  const [updatedClient, setUpdatedClient] = useState(client);

  const handleFieldChange = (fieldName, value) => {
    const updatedClientCopy = { ...updatedClient, [fieldName]: value };
    setUpdatedClient(updatedClientCopy);
  };

  const handleSaveChangesInternal = async () => {
    try {

      await updateClient(updatedClient.id, updatedClient);
      handleClose()
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      // Maneja el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={updatedClient.nombre}
              onChange={(e) => handleFieldChange('nombre', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={updatedClient.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              value={updatedClient.telefono || ''}
              onChange={(e) => handleFieldChange('telefono', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              value={updatedClient.direccion || ''}
              onChange={(e) => handleFieldChange('direccion', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              value={updatedClient.cedula || ''}
              onChange={(e) => handleFieldChange('cedula', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formActivo">
            <Form.Check
              type="checkbox"
              label="Activo"
              checked={updatedClient.activo}
              onChange={(e) => handleFieldChange('activo', e.target.checked)}
            />
          </Form.Group>

          {/* Agrega más campos según tus necesidades */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveChangesInternal}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditClient;