import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";

import { axios } from "helpers/custom-api";

const User = ({ userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  const getUser = userId => {
    axios
      .get(`/api/users/${userId}`)
      .then(({ data }) => setUser(data))
      .catch(err => console.log(err));
  };

  const deleteUser = userId => {
    axios
      .delete(`/api/users/${userId}`)
      .then(({ data }) => {
        alert(`${user.email} was succefully deleted`);
        navigate("/users");
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <h2>{user.email}</h2>
      <ul>
        <li>
          Songbook Allowed:{" "}
          {user.songbookAllowed ? <>Allowed</> : <>Not Allowed</>}
        </li>
        <li>
          Roster Allowed: {user.rosterAllowed ? <>Allowed</> : <>Not Allowed</>}
        </li>
        <li>
          Foes Allowed: {user.foesAllowed ? <>Allowed</> : <>Not Allowed</>}
        </li>
        <li>
          Users Allowed: {user.usersAllowed ? <>Allowed</> : <>Not Allowed</>}
        </li>
      </ul>
      <div>
        <Link to={`${user._id}/edit`}>Edit</Link> | <button>Delete</button>
      </div>
    </>
  );
};

export default User;
