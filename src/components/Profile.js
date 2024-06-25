import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUsers } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.users.name);
  const [editedEmail, setEditedEmail] = useState(user.users.email);
  const [editedGender, setEditedGender] = useState(user.users.gender);
  const [editedStatus, setEditedStatus] = useState(user.users.status);
  const [showAlert, setShowAlert] = useState(false); // state for showing alert

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://gorest.co.in/public/v2/users/${user.users.id}`,
        {
          name: editedName,
          email: editedEmail,
          gender: editedGender,
          status: editedStatus,
        },
        {
          headers: {
            Authorization: `Bearer 4a8d1790a66bee49376e55cb7f405554428d8c9b686bc8af3f572a5047d8fc9e`,
          },
        }
      );
      console.log("User updated:", response.data);
      setShowAlert(true);

      // Update user state in Redux
      const updatedUser = {
        ...user.users,
        name: editedName,
        email: editedEmail,
        gender: editedGender,
        status: editedStatus,
      };
      dispatch(setUsers(updatedUser));

      // Exit edit mode
      toggleEdit();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            {editing && (
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  zIndex: "1",
                }}
                variant="secondary"
                onClick={toggleEdit}
              ></button>
            )}
            <Card.Body>
              <h1 className="card-title text-center mb-4">Profile</h1>
              {showAlert && (
                <Row className="mb-3">
                  <Col>
                    <Alert
                      variant="success"
                      onClose={() => setShowAlert(false)}
                      dismissible
                    >
                      Profile edited successfully!
                    </Alert>
                  </Col>
                </Row>
              )}
              <Row className="mb-2">
                <Col>
                  <p>
                    <strong>Name:</strong>{" "}
                    {editing ? (
                      <Form.Control
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Enter name"
                      />
                    ) : (
                      user.users.name
                    )}
                  </p>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <p>
                    <strong>Email:</strong>{" "}
                    {editing ? (
                      <Form.Control
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        placeholder="Enter email"
                      />
                    ) : (
                      user.users.email
                    )}
                  </p>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <p>
                    <strong>Gender:</strong>{" "}
                    {editing ? (
                      <Form.Select
                        value={editedGender}
                        onChange={(e) => setEditedGender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    ) : (
                      user.users.gender
                    )}
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <p>
                    <strong>Status:</strong>{" "}
                    {editing ? (
                      <Form.Select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Select>
                    ) : (
                      user.users.status
                    )}
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                {editing ? (
                  <>
                    <Button
                      className="m-auto mb-3"
                      variant="success"
                      onClick={handleUpdate}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="m-auto mb-3"
                      variant="primary"
                      onClick={toggleEdit}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
