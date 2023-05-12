import React, { useState } from "react";
import axios from "axios";
import LocalStorageService from "../utils/LocalStorageService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the name to the server and save it through the user model
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, { name }).then((response) => {
        LocalStorageService.setItem("userName", name);
        console.log(response.data);
        // navigate("/home");
      });

      // Clear the input field
      setName("");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Index Number
              </label>
              <input type="number" className="form-control" id="name" value={name} onChange={handleNameChange} required />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
