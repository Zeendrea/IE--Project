import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Container, ListGroup, Button, Form, Modal } from 'react-bootstrap';

const App = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: '', description: '', price: 0, availability: true });
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);

  // Fetch services from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  // Add new service
  const handleAddService = () => {
    axios.post('http://localhost:8080/api/services', newService)
      .then(response => {
        setServices([...services, response.data]);
        setNewService({ title: '', description: '', price: 0, availability: true });
      })
      .catch(error => {
        console.error('Error adding service:', error);
      });
  };

  // Update service
  const handleUpdateService = () => {
    axios.put(`http://localhost:8080/api/services/${editService.serviceID}`, editService)
      .then(response => {
        setServices(services.map(service => service.serviceID === editService.serviceID ? response.data : service));
        setShowModal(false);
        setEditService(null);
      })
      .catch(error => {
        console.error('Error updating service:', error);
      });
  };

  // Delete service
  const handleDeleteService = (serviceID) => {
    axios.delete(`http://localhost:8080/api/services/${serviceID}`)
      .then(() => {
        setServices(services.filter(service => service.serviceID !== serviceID));
      })
      .catch(error => {
        console.error('Error deleting service:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TrabaHanap Services</h1>
      </header>

      <Container>
        <h3>Add New Service</h3>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Available" checked={newService.availability} onChange={(e) => setNewService({ ...newService, availability: e.target.checked })} />
          </Form.Group>
          <Button onClick={handleAddService}>Add Service</Button>
        </Form>

        <h3 className="mt-4">Service List</h3>
        <ListGroup>
          {services.map(service => (
            <ListGroup.Item key={service.serviceID} className="service-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{service.title}</h5>
                <p>{service.description}</p>
                <p><strong>Price: €{service.price}</strong></p>
                <p>Available: {service.availability ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <Button variant="secondary" onClick={() => { setEditService(service); setShowModal(true); }}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteService(service.serviceID)}>Delete</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      {/* Modal for Editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editService && (
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={editService.title} onChange={(e) => setEditService({ ...editService, title: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={editService.description} onChange={(e) => setEditService({ ...editService, description: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={editService.price} onChange={(e) => setEditService({ ...editService, price: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="Available" checked={editService.availability} onChange={(e) => setEditService({ ...editService, availability: e.target.checked })} />
              </Form.Group>
              <Button onClick={handleUpdateService}>Save Changes</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
