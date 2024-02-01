import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateClient } from '../../../api/client.api';
import { getExonet } from '../../../api/hacienda.exoneracion.api.js'
import { createExonet } from '../../../api/exonet.api.js'

const EditClient = ({ show, handleClose, client }) => {
  const [updatedClient, setUpdatedClient] = useState(client);
  const [exonet, setExonet] = useState({
    numeroDocumento: '',
    porcentajeExoneracion: null,
    fechaVencimiento: null,
  });

  const handleFieldChange = (fieldName, value) => {
    const updatedClientCopy = { ...updatedClient, [fieldName]: value };
    setUpdatedClient(updatedClientCopy);

    // Si el campo cambia y es 'numeroDocumento', carga la exoneración
    if (fieldName === 'numeroDocumento') {
      loadExoner(value);
    }
  };

  const handleSaveChangesInternal = async () => {
    try {
      await updateClient(updatedClient.id, updatedClient);
      handleClose();
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      // Maneja el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
    }
  };

   const loadExoner = async (numeroDocumento) => {
    try {
      const res = await getExonet(numeroDocumento);
      const exoneracionData = res.data;

      setExonet({
        numeroDocumento: exoneracionData.numeroDocumento || '',
        porcentajeExoneracion: exoneracionData.porcentajeExoneracion || null,
        fechaVencimiento: exoneracionData.fechaVencimiento || null,
      });
    } catch (error) {
      console.error('Error al cargar exoneración:', error);
    }
  };

  useEffect(() => {
    if (updatedClient.isExonet) {
      loadExoner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedClient.isExonet]);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
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
          <Form.Group controlId="formIsExonet">
            <Form.Check
              type="checkbox"
              label="¿Es exonerado?"
              checked={updatedClient.isExonet}
              onChange={(e) => handleFieldChange('isExonet', e.target.checked)}
            />
          </Form.Group>

          {updatedClient.isExonet && (
            <div className="horizontal-fields-container">
              <Form.Group controlId="formNumeroDocumento">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control
                  type="text"
                  value={exonet.numeroDocumento}
                  onChange={(e) => handleFieldChange('exoneracion.numeroDocumento', e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPorcentajeExoneracion">
                <Form.Label>Porcentaje de Exoneración</Form.Label>
                <Form.Control
                  type="text"
                  value={exonet.porcentajeExoneracion}
                  onChange={(e) => handleFieldChange('exoneracion.porcentajeExoneracion', e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formFechaVencimiento">
                <Form.Label>Fecha de Vencimiento</Form.Label>
                <Form.Control
                  type="text"
                  value={exonet.fechaVencimiento}
                  onChange={(e) => handleFieldChange('exoneracion.fechaVencimiento', e.target.value)}
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
        <Button variant="primary" onClick={handleSaveChangesInternal}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditClient;
