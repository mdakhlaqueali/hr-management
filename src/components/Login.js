import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, setUsers } from "../store/userSlice";


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
    <div>
      <h1>HR Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>For admin panel just type "admin" in the Email.</p>
    </div>
    
  );
};

export default Login;
