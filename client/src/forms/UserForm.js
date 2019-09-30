import React, { useState } from "react";
import TextInput from "components/TextInput";

const UserForm = ({
  values,
  handleFormSubmit,
  handleInputChange,
  handleToggleChange,
  resetForm,
  edit
}) => {
  return (
    <>
      <h2>Add User</h2>
      <form method="POST" onSubmit={handleFormSubmit}>
        <div>
          <TextInput
            target="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={values.email}
            handleInputChange={handleInputChange}
            required={true}
          />
        </div>
        <div>
          <TextInput
            target="songbookAllowed"
            type="checkbox"
            value={values.songbookAllowed}
            label="Song Book Allowed"
            handleInputChange={handleToggleChange}
          />
        </div>
        <div>
          <TextInput
            target="rosterAllowed"
            type="checkbox"
            value={values.rosterAllowed}
            label="Roster Allowed"
            handleInputChange={handleToggleChange}
          />
        </div>
        <div>
          <TextInput
            target="foesAllowed"
            type="checkbox"
            value={values.foesAllowed}
            label="Foes Allowed"
            handleInputChange={handleToggleChange}
          />
        </div>
        <div>
          <TextInput
            target="usersAllowed"
            type="checkbox"
            value={values.usersAllowed}
            label="Users Allowed"
            handleInputChange={handleToggleChange}
          />
        </div>
        <div>
          <TextInput
            target="pushNotificationsAllowed"
            type="checkbox"
            value={values.pushNotificationsAllowed}
            label="Push Notifications Allowed"
            handleInputChange={handleToggleChange}
          />
        </div>
        <div>
          <TextInput
            target="password"
            type="password"
            value={values.password}
            label="Password"
            handleInputChange={handleInputChange}
            required={true}
          />
        </div>
        <div
          style={{
            marginTop: "1em"
          }}
        >
          <button type="submit">Create User</button> |{" "}
          <button type="reset" onClick={resetForm}>
            Reset Form
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
