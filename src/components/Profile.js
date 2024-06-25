import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log("bus",user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.users.name}</p>
      <p>Email: {user.users.email}</p>
      <p>Gender: {user.users.gender}</p>
      <p>Status: {user.users.status}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;