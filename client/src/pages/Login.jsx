import React, { useState, useEffect } from "react";
import axios from "axios";
import LocalStorageService from "../utils/LocalStorageService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [lock, setLock] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing user based on the index number
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users?index=${index}`);
        const user = response.data.user;
        if (user) {
          LocalStorageService.setItem("_id", user._id);
          setName(user.name);
          setLock(true);
        } else {
          setLock(false);
          setName("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [index]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, { name, index });
      const userId = response.data.userId;
      console.log("User logged in:", userId);
      LocalStorageService.setItem("_id", userId);
      LocalStorageService.setItem("userName", name);
      LocalStorageService.setItem("index", index);
      // Redirect or perform additional actions upon successful login
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="index" className="form-label">
                    Index Number:
                  </label>
                  <input type="number" className="form-control" id="index" value={index} onChange={(e) => setIndex(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={lock}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
