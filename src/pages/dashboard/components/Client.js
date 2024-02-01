// ClientList.js
import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { getAllClient } from '../../../api/client.api'; 
import EditClient from './EditClient';
import CreateClientModal from './CreateClientModal';
import '../stylesheets/Clients.css'

const Client = () => {

  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);


  const loadClient = async () => {
    try {
      const res = await getAllClient();
      setClients(res.data);
    } catch (error) {
      alert('Error al cargar clientes:', error);
    }
  };

  useEffect(() => {
    loadClient();
  }, []);

  const filteredClients = clients.filter(client =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEditClick = (client) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedClient(null);
    loadClient()
  };

  const handleCreateModalShow = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    loadClient();
  };

  return (
    <div>
      {/* Search bar */}
      <Button className="mt-3" variant="primary" onClick={handleCreateModalShow}>
        Crear Cliente
      </Button>
      <InputGroup className="mt-3">
        <FormControl
          placeholder="Buscar Cliente"
          aria-label="Buscar Cliente"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-secondary">Buscar</Button>
      </InputGroup>

        {/* Create button */}



      <Table striped bordered hover>
        <thead>
          <tr>
          <th className="column-codigo">Código</th>
      <th className="column-nombre">Nombre</th>
      <th className="column-email">Email</th>
      <th className="column-telefono">Teléfono</th>
      <th className="column-direccion">Dirección</th>
      <th className="column-cedula">Cédula</th>
      <th className="column-activo">Activo</th>
      <th className="column-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nombre}</td>
              <td>{client.email}</td>
              <td>{client.telefono}</td>
              <td>{client.direccion}</td>
              <td>{client.cedula}</td>
              <td>{client.activo ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="info" onClick={() => handleEditClick(client)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        {selectedClient && (
        <EditClient
          show={showEditModal}
          handleClose={handleEditModalClose}
          client={selectedClient}
        />
        
      )}
      </Table>
      <CreateClientModal
        show={showCreateModal}
        handleClose={handleCreateModalClose}
      />
    </div>
  );
};

export default Client;
