import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImage from "../assets/bg-login.png";

const Login = () => {
  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [splitwiseEmail, setSplitwiseEmail] = useState("");
  const [lock, setLock] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing users based on the index number
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${index}`);
        const user = response.data.user;
        if (user) {
          sessionStorage.setItem("user", JSON.stringify(user));
          setGender(user.gender);
          setName(user.name);
          setSplitwiseEmail(user.splitwiseEmail);
          setGender(user.gender);
          setLock(true);
        } else {
          setLock(false);
          setName("");
          setSplitwiseEmail("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (index.length === 6) {
      fetchUser();
    }
  }, [index]);

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) {
      navigate("/foodmenu");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, { name, index, gender, splitwiseEmail });
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/foodMenu");
    } catch (error) {
      toast.error("First you need to be added to the splitwise group😢.");
    }
  };

  if (loading) {
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    )
  }

  return (
    <>
      <div
        className="container d-flex align-items-center justify-content-center vh-100"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
      >
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-3">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 row">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="100000"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    required
                    min={200000}
                    max={999999}
                  />
                  <label htmlFor="floatingInput">Index Number</label>
                </div>
                <div className="form-floating mb-3 row">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={lock}
                    required
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>
                <div className="form-floating mb-3 row">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={splitwiseEmail}
                    onChange={(e) => setSplitwiseEmail(e.target.value)}
                    readOnly={lock}
                    required
                  />
                  <label htmlFor="floatingInput">Splitwise Email</label>
                </div>

                {!lock && (
                  <div className="row g-3 mb-3 ">
                    <div className="form-check col">
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
                    <div className="form-check col">
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

                <button className="col-12 btn btn-primary" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
