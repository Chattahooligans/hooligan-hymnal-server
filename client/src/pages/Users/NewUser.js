import React, { useState } from "react";
import UserForm from "forms/UserForm";
import { axios } from "helpers/custom-api";
import { navigate } from "@reach/router";

function NewUser() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    songbookAllowed: false,
    foesAllowed: false,
    pushNotificationsAllowed: false,
    rosterAllowed: false,
    usersAllowed: false
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const { email, password } = values;
    if ((email, password)) {
      axios
        .post(`/api/users`, values)
        .then(({ data }) => {
          navigate(`/users/${data.user._id}`);
        })
        .catch(err => console.log(err));
    }
  };

  const handleToggleChange = e => {
    const { checked, name } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const resetForm = () => {
    setValues({
      email: "",
      password: "",
      songbookAllowed: false,
      foesAllowed: false,
      pushNotificationsAllowed: false,
      rosterAllowed: false,
      usersAllowed: false
    });
  };

  return (
    <>
      <h2>New User</h2>
      <UserForm
        values={values}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleToggleChange={handleToggleChange}
        reset={resetForm}
      />
    </>
  );
}

export default NewUser;
