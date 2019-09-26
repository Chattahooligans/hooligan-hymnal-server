import React, { useState } from "react";
import { Link } from "@reach/router";
import RegisterForm from "forms/RegisterForm";
import Axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    emailConfirmed: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    Axios.post(`/api/users/register`, {
      email: values.email,
      password: values.password
    })
      .then(({ data }) => {
        setMessage(data.message);
        setValues({
          email: "",
          emailConfirmed: "",
          password: ""
        });
      })
      .catch(res => console.log(res));
  };
  return (
    <>
      <h2>Register</h2>
      {message.length > 0 && (
        <div>
          {message}
          <br />
          Please <Link to="/users/login">Login</Link> to continue
        </div>
      )}
      <div></div>
      <RegisterForm
        values={values}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default Register;
