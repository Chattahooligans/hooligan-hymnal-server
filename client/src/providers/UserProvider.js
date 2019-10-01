import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { navigate } from "@reach/router";
import { getCookie, setCookie } from "helpers/cookies";
import { axios } from 'helpers/custom-api'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = values => {
    axios
      .post(`/api/users/login`, values)
      .then(({ data }) => {
        setToken(data.token);
        storeRefresh(data.refreshToken);
        setUser(data.user);
        getUser();
        navigate("/");
      })
      .catch(err => console.log(err));
  };

  const isBrowser = () => typeof window !== "undefined";

  const getUser = () => {
    const token = localStorage.getItem("token");
    const cookie = getCookie("refreshToken");
    if (isBrowser() && (user && token)) {
      return user;
    } else if (token) {
      let bearer = token;
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
    // setTimeout(() => {}, 1);
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
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
