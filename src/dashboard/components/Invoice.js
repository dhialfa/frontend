// Invoice.js

import React, { useState, useEffect } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import '../stylesheets/Invoice.css'; // Importa el archivo CSS
import { getAllClient } from '../../api/client.api';

const Invoice = () => {
  const [cliente, setClient] = useState([]);

  useEffect(() => {
    async function loadClient() {
      const res = await getAllClient();
      setClient(res.data);
    }
    loadClient();
  }, []);

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

  const handleTipoFacturaChange = (event) => {
    setTipoFactura(event.target.value);
  };

  const handleDetallesChange = (index, field, value) => {
    const newDetalles = [...detalles];
    newDetalles[index] = { ...newDetalles[index], [field]: value };
    setDetalles(newDetalles);
  };

  const handleAgregarLinea = () => {
    setDetalles([...detalles, { codigo: '', cantidad: 0, articulo: '', descuento: 0, precio: 0, total: 0, ivaExonerado: false }]);
  };
  
  const handleEliminarLinea = (index) => {
    const newDetalles = [...detalles];
    newDetalles.splice(index, 1);
    setDetalles(newDetalles);
  };


  return (
    <div className="container">
      {/* Sección de búsqueda del cliente */}
      <Form>
        <Form.Group controlId="formCedula" className="form-group">
          <Form.Label>Cédula del Cliente</Form.Label>
          <Form.Control
            className="''"
            type="text"
            placeholder="Ingrese la cédula"
            value={cliente.cedula}
            onChange={(e) => setClient({ ...cliente, cedula: e.target.value })}
          />
          <Form.Text className="text-muted">
            {/* Puedes mostrar mensajes de ayuda o validación aquí */}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" className="btn-search" >
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
            <th className="column-codigo">Código</th>
            <th className="column-cantidad">Cantidad</th>
            <th className="column-articulo">Artículo</th>
            <th className="column-descuento">Descuento</th>
            <th className="column-precio">Precio</th>
            <th className="column-total">Total</th>
            <th className="column-iva">IVA Exonerado</th>
            <th className="column-acciones">Acciones</th>
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
              <td>
                <Form.Control
                  type="text"
                  value={detalle.articulo}
                  onChange={(e) => handleDetallesChange(index, 'articulo', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={detalle.descuento}
                  onChange={(e) => handleDetallesChange(index, 'descuento', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={detalle.precio}
                  onChange={(e) => handleDetallesChange(index, 'precio', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={detalle.total}
                  onChange={(e) => handleDetallesChange(index, 'total', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={detalle.ivaExonerado}
                  onChange={(e) => handleDetallesChange(index, 'ivaExonerado', e.target.value)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleEliminarLinea(index)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botón para agregar una nueva línea */}
      <Button variant="success" onClick={handleAgregarLinea}>+ Agregar Línea</Button>
    </div>
  );
};

export default Invoice;

