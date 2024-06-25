import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';

const Admin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male'); // default value
  const [status, setStatus] = useState('active'); // default value

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
    <div>
      <div style={{display:'flex', justifyContent:"space-between"}}>
      <h1>Admin Panel</h1>
      <button onClick={handleLogout}>Go to Login</button>
      </div>
      
      <form onSubmit={handleAddEmployee}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default Admin;
