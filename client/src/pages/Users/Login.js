import React, { useState, useContext } from "react";
import { handleLogin, isLoggedIn, getUser } from "services/auth";
import { navigate } from "@reach/router";
import Axios from "axios";

import UserProvider from "providers/UserProvider";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    handleLogin({
      email: values.email,
      password: values.password
    });
    navigate("/");
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      <h2>Login</h2>
      <form method="POST" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="Email Address"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
