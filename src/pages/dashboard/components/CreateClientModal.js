import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createClient } from '../../../api/client.api.js';
import { createExonet } from '../../../api/exonet.api.js';
import { getCedula } from '../../../api/hacienda.cedulas.api';
import { getExonet } from '../../../api/hacienda.exoneracion.api.js';
import { getCabys } from '../../../api/cabys.api.js';
import '../stylesheets/CreateClient.css';


const CreateClientModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    activo: true,
    provincia: null,
    canton: null,
    distrito: null,
    barrio: null,
    descuento: null,
    isCredit: false,
    dias: null,
    limite: null,
    isExonet: false,
    exonet: {
      numeroDocumento: '',
      porcentajeExoneracion: '',
      fechaVencimiento: '',
    }
  });

  const handleFieldChange = async (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      ...(fieldName.startsWith('exonet.')
        ? {
            exonet: { ...prevData.exonet, [fieldName.substring(7)]: value },
          }
        : { [fieldName]: value }
      ),
    }));

    if (fieldName === 'exonet.numeroDocumento') {
      try {
        const res = await getExonet(value);
        setFormData((prevData) => ({
          ...prevData,
          exonet: {
            ...prevData.exonet,
            porcentajeExoneracion: res.data.porcentajeExoneracion,
            fechaVencimiento: res.data.fechaVencimiento,
          },
        }));
      } catch (error) {
        console.error('Error al cargar Exonet:', error);
      }
    }
  };

  const loadCedula = async () => {
    try {
      const res = await getCedula(formData.cedula);
      setFormData((prevData) => ({ ...prevData, nombre: res.data.nombre }));
    } catch (error) {
      console.error('Error al cargar nombre:', error);
    }
  };

  const handleCreateClient = async () => {
    try {
      await createClient(formData);
      await createExonet(formData.exonet);
    } catch (error) {
      console.error('Error al crear cliente:', error);
    }
    handleClose();
  };

  useEffect(() => {
    if (formData.cedula && formData.cedula.length > 8) {
      loadCedula();
    }
  }, [formData.cedula]);

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
              value={formData.cedula}
              onChange={(e) => handleFieldChange('cedula', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={formData.nombre}
              onChange={(e) => handleFieldChange('nombre', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              value={formData.telefono}
              onChange={(e) => handleFieldChange('telefono', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formIsCredit">
            <Form.Check
              type="checkbox"
              label="Credito"
              checked={formData.isCredit}
              onChange={(e) => handleFieldChange('isCredit', e.target.checked)}
            />
          </Form.Group>

          {formData.isCredit && (
            <div className="horizontal-fields-container">
              <Form.Group controlId="formDias">
                <Form.Label>Días de crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.dias}
                  onChange={(e) => handleFieldChange('dias', e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formLimite">
                <Form.Label>Límite de crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.limite}
                  onChange={(e) => handleFieldChange('limite', e.target.value)}
                />
              </Form.Group>
            </div>
          )}

          <Form.Group controlId="formIsExonet">
            <Form.Check
              type="checkbox"
              label="¿Es exonerado?"
              checked={formData.isExonet}
              onChange={(e) => handleFieldChange('isExonet', e.target.checked)}
            />
          </Form.Group>

          {formData.isExonet && (
            <div className="horizontal-fields-container">
              <Form.Group controlId="formNumeroDocumentoExonet">
                <Form.Label>Número de Documento Exonet</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.exonet.numeroDocumento}
                  onChange={(e) =>
                    handleFieldChange('exonet.numeroDocumento', e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group controlId="formPorcentajeExoneracion">
                <Form.Label>Porcentaje de Exoneración</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.exonet.porcentajeExoneracion}
                  onChange={(e) =>
                    handleFieldChange(
                      'exonet.porcentajeExoneracion',
                      e.target.value
                    )
                  }
                />
              </Form.Group>

              <Form.Group controlId="formFechaVencimiento">
                <Form.Label>Fecha de Vencimiento</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.exonet.fechaVencimiento}
                  onChange={(e) =>
                    handleFieldChange('exonet.fechaVencimiento', e.target.value)
                  }
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
