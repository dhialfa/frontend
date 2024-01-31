import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getCedula } from '../../../api/hacienda.cedulas.api';
import '../stylesheets/CreateClient.css'

const CreateClientModal = ({ show, handleClose }) => {
  const [newClient, setNewClient] = useState({
    cedula: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    activo: false,
    provincia: null,
    canton: null,
    distrito: null,
    barrio: null,
    descuento: null,
    isCredit: false,
    dias: null,
    limite: null,
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
    // Realiza la lógica necesaria para crear el cliente con los datos en 'newClient'
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
            <Form.Label>Cédula</Form.Label>
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
          <Form.Group controlId="formTelefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              value={newClient.telefono}
              onChange={(e) => handleFieldChange('telefono', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formIsCredit">
            <Form.Check
              type="checkbox"
              label="Credito"
              checked={newClient.isCredit}
              onChange={(e) => handleFieldChange('isCredit', e.target.checked)}
            />
          </Form.Group>
          {newClient.isCredit && (
            <div className="horizontal-fields-container">
              <Form.Group controlId="formDias">
                <Form.Label>Días de crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={newClient.dias}
                  onChange={(e) => handleFieldChange('dias', e.target.value)}
                />
              </Form.Group>
            
              <Form.Group controlId="formLimite">
                <Form.Label>Límite de crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={newClient.limite}
                  onChange={(e) => handleFieldChange('limite', e.target.value)}
                />
              </Form.Group>
            </div>
          
          )}
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
