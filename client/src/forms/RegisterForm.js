import React from "react";
import TextInput from "components/TextInput";

const RegisterForm = ({ values, handleInputChange, handleFormSubmit }) => {
  return (
    <form method="POST" onSubmit={handleFormSubmit}>
      <TextInput
        type="email"
        target="email"
        label="Email"
        placeholder="Email"
        value={values.email}
        handleInputChange={handleInputChange}
      />
      <br />
      <TextInput
        type="email"
        target="emailConfirmed"
        label="Confirm Email"
        placeholder="Confirm Email"
        value={values.emailConfirmed}
        handleInputChange={handleInputChange}
      />
      <br />
      <TextInput
        type="password"
        target="password"
        label="Password"
        placeholder="Password"
        value={values.password}
        handleInputChange={handleInputChange}
      />
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
