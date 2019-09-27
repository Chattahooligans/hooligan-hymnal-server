import Axios from "axios";
import { useState } from "react";

export const isBrower = () => typeof window !== "undefined";
export const [getMessage, setMessage] = useState({});
export const getUser = () => {
  Axios.get(`/api/users/me`)
    .then(({ data }) => {
      setUser({
        id: data._id,
        email: data.email,
        pushNotificationsAllowed: data.pushNotificationsAllowed,
        rosterAllowed: data.rosterAllowed,
        songbookAllowed: data.songbookAllowed,
        foesAllowed: data.foesAllowed
      });
    })
    .catch(_ => setUser({}));
};

const setUser = user =>
  window.localStorage.setItem("user", JSON.stringify(user));

export const handleLogin = ({ email, password }) => {
  if (email && password) {
    Axios.post(`/api/users/login`, {
      email: email,
      password: password
    })
      .then(res => {
        getUser();
      })
      .catch(_ => setUser({}));
  }
  return false;
};

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.email;
};

export const logout = callback => {
  setUser({});
  callback();
};
