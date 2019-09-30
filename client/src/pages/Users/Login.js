import React, { useState, useContext } from "react";
import Layout from "layouts/Layout";

import { UserContext } from "providers/UserContext";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      <h2>Login</h2>
      <form
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          handleLogin(values);
        }}
      >
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
