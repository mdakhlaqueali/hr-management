import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';
import { Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';

const Admin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male'); // default value
  const [status, setStatus] = useState('active'); // default value
  const [showAlert, setShowAlert] = useState(false); // state for showing alert

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://gorest.co.in/public/v2/users',
        {
          name,
          email,
          gender,
          status,
        },
        {
          headers: {
            Authorization: `Bearer 4a8d1790a66bee49376e55cb7f405554428d8c9b686bc8af3f572a5047d8fc9e`,
          },
        }
      );
      console.log('Employee added:', response.data);
      setShowAlert(true); // Show alert on successful submission
      // Reset form fields
      setName('');
      setEmail('');
      setGender('male');
      setStatus('active');
    } catch (error) {
      console.error('Error adding employee:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        if (error.response.data && error.response.data[0] && error.response.data[0].message) {
          console.error('API Error Message:', error.response.data[0].message);
        }
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h1>Admin Panel</h1>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={handleLogout}>Go to Login</Button>
        </Col>
      </Row>

      {showAlert && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Employee added successfully!
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={6}>
          <Form onSubmit={handleAddEmployee}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit">Add Employee</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
