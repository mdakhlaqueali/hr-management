import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h1 className="card-title text-center mb-4">Profile</h1>
              <Row className="mb-3">
                <Col>
                  <p><strong>Name:</strong> {user.users.name}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <p><strong>Email:</strong> {user.users.email}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <p><strong>Gender:</strong> {user.users.gender}</p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <p><strong>Status:</strong> {user.users.status}</p>
                </Col>
              </Row>
            </Card.Body>
            <Button className='m-auto mb-3' variant="primary" onClick={handleLogout} block>Logout</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;