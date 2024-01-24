// Invoice.js

import React, { useState } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import '../stylesheets/Invoice.css'; // Importa el archivo CSS

const Invoice = () => {
  const [cliente, setCliente] = useState({
    cedula: '',
    nombre: '',
    email: '',
    telefono: ''
  });

  const [tipoFactura, setTipoFactura] = useState('');

  const [detalles, setDetalles] = useState([
    {
      codigo: '',
      cantidad: 0,
      articulo: '',
      descuento: 0,
      precio: 0,
      total: 0,
      ivaExonerado: false
    }
  ]);

  const handleBuscarCliente = () => {
    // Lógica para buscar el cliente y actualizar el estado
    // Puedes implementar esta lógica según tus necesidades
  };

  const handleTipoFacturaChange = (event) => {
    setTipoFactura(event.target.value);
  };

  const handleDetallesChange = (index, field, value) => {
    // Actualiza el estado de detalles según el cambio
    // Puedes implementar esta lógica según tus necesidades
  };

  return (
    <div className="container">
      {/* Sección de búsqueda del cliente */}
      <Form>
        <Form.Group controlId="formCedula" className="form-group">
          <Form.Label>Cédula del Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la cédula"
            value={cliente.cedula}
            onChange={(e) => setCliente({ ...cliente, cedula: e.target.value })}
          />
          <Form.Text className="text-muted">
            {/* Puedes mostrar mensajes de ayuda o validación aquí */}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" className="btn-search" onClick={handleBuscarCliente}>
          Buscar Cliente
        </Button>
      </Form>

      {/* Sección del tipo de factura */}
      <Form>
        <Form.Group controlId="formTipoFactura" className="form-group">
          <Form.Label>Tipo de Factura</Form.Label>
          <Form.Control
            as="select"
            value={tipoFactura}
            onChange={handleTipoFacturaChange}
          >
            <option value="facturaA">Factura A</option>
            <option value="facturaB">Factura B</option>
            <option value="facturaC">Factura C</option>
          </Form.Control>
        </Form.Group>
      </Form>

      {/* Sección de la tabla de detalles */}
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cantidad</th>
            <th>Artículo</th>
            <th>Descuento</th>
            <th>Precio</th>
            <th>Total</th>
            <th>IVA Exonerado</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={detalle.codigo}
                  onChange={(e) => handleDetallesChange(index, 'codigo', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={detalle.cantidad}
                  onChange={(e) => handleDetallesChange(index, 'cantidad', e.target.value)}
                />
              </td>
              {/* Agrega más columnas según sea necesario */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Invoice;
