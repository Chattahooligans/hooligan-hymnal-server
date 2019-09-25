import React, { useState, useEffect, useRef } from "react";
import RegisterForm from "forms/RegisterForm";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    emailConfirmed: "",
    password: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = () => {};
  return (
    <>
      <h2>Register</h2>
      <RegisterForm
        values={values}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default Register;
