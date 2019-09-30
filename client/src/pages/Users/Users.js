import React, { useState, useEffect } from "react";
import { axios } from "helpers/custom-api";
import { Link } from "@reach/router";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/users`)
      .then(({ data }) => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const getUsers = () => {};

  return (
    <>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>{user.email}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
