import React, { useState, useEffect } from "react";
import axios from "axios";
import LocalStorageService from "../utils/LocalStorageService";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [lock, setLock] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing user based on the index number
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users?index=${index}`);
        const user = response.data.user;
        if (user) {
          LocalStorageService.setItem("user", JSON.stringify(user));
          setGender(user.gender);
          setName(user.name);
          setGender(user.gender);
          setLock(true);
        } else {
          setLock(false);
          setName("");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (index.length === 6) {
      fetchUser();
    } else {
      setName("");
      setLock(false);
    }
  }, [index]);

  useEffect(() => {
    // to wait until backend responds
    const fetchUser = async () => {
      let x = false;
      while (!x) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/all`);
          if (response.status === 200) {
            setLoading(false);
            x = true;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, { name, index, gender });
      LocalStorageService.setItem("user", JSON.stringify(response.data.user));
      navigate("/foodMenu");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="container d-flex align-items-center justify-content-center vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
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
                    {!lock && (
                      <div className="mb-3">
                        <label className="form-label">Gender:</label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="male"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={() => setGender("male")}
                            required
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={() => setGender("female")}
                            required
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
