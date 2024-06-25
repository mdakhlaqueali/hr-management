import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, setUsers } from "../store/userSlice";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://gorest.co.in/public/v2/users", {
        headers: {
          Authorization: `Bearer 4a8d1790a66bee49376e55cb7f405554428d8c9b686bc8af3f572a5047d8fc9e`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for admin credentials
    if (email === "admin") {
      dispatch(login({ email, isAdmin: true }));
      navigate("/admin");
      return;
    }

    try {
      const users = await fetchUsers();
      const user = users.find((user) => user.email === email);
      if (user) {
        dispatch(login({ email, isAdmin: false }));
        dispatch(setUsers(user));
        navigate("/profile");
      } else {
        alert("Invalid email");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h1 className="card-title text-center mb-5">
                HR Management System
              </h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
                <Button className="mt-4" type="submit" variant="primary" block>
                  Login
                </Button>
              </Form>
              <p className="text-center mt-3">
                For admin panel just type "admin" in the Email.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
