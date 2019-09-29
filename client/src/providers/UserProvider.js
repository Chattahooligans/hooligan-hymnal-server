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
  // // eslint-disable-next-line
  // Date.prototype.addDays = function(days) {
  //   let date = new Date(this.valueOf());
  //   date.setDate(date.getDate() + days);
  //   return date;
  // };

  // const setCookie = (cname, cvalue, exdays) => {
  //   let date = new Date();
  //   date = date.addDays(exdays);
  //   date = date.toUTCString();
  //   const expires = `expires=${date}`;
  //   document.cookie = `${cname}=${cvalue};${expires};path=/`;
  // };

  // const getCookie = cname => {
  //   const name = `${cname}=`;
  //   const cookieArray = document.cookie.split(";");
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     let cookie = cookieArray[i];
  //     while (cookie.charAt(0) === " ") {
  //       cookie = cookie.substr(1);
  //     }
  //     if (name.indexOf(cookie)) {
  //       return cookie.substr(name.length, cookie.length);
  //     }
  //   }
  // };

  const storeRefresh = refreshToken => {
    setCookie("refreshToken", refreshToken, 1);
  };

  const isLoggedIn = () => {
    getUser();
    if (user) {
      return user.email;
    }
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
