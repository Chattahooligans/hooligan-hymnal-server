import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { navigate } from "@reach/router";
import { getCookie, setCookie } from "helpers/cookies";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = values => {
    const { email, password } = values;
    if (email && password) {
      axios
        .post(`/api/users/login`, {
          email: email,
          password: password
        })
        .then(({ data }) => {
          setToken(data.token);
          storeRefresh(data.refreshToken);
          setUser(data.user);
          getUser();
          navigate("/");
        })
        .catch(err => console.log(err));
    }
  };

  const isBrowser = () => typeof window !== "undefined";

  const getUser = () => {
    const token = localStorage.getItem("token");
    const cookie = getCookie("refreshToken");
    if (isBrowser() && (user && token)) {
      return user;
    } else if (token || cookie) {
      let bearer = token || cookie;
      axios
        .get(`/api/users/me`, {
          headers: {
            Authorization: `Bearer ${bearer}`
          }
        })
        .then(({ data }) => {
          const { user } = data;
          setUser(user);
        })
        .catch(_ => {});
    }
  };

  const setToken = token => {
    window.localStorage.setItem("token", token);
  };

  const storeRefresh = refreshToken => {
    setCookie("refreshToken", refreshToken, 1);
  };

  const isLoggedIn = () => {
    getUser();
    if (user) {
      return user.email;
    }
    return false;
  };

  const logout = e => {
    setTimeout(() => {}, 500);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/users/login");
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        isLoggedIn,
        logout,
        handleLogin
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
