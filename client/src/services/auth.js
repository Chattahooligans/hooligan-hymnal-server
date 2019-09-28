import Axios from "axios";
import cookies from "cookies-js";

export const isBrowser = () => typeof window !== "undefined";
export const getUser = () => {
  if (
    isBrowser() &&
    (localStorage.getItem("user") && localStorage.getItem("token"))
  ) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } else {
    Axios.get(`http://localhost:5000/api/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(({ data }) => {
        const { user } = data;
        setUser(user);
      })
      .catch(_ => {
        // debugger;
      });
  }
};

const setUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};

const setToken = token => window.localStorage.setItem("token", token);

const setCookie = (cname, cvalue, exdays) => {
  let date = new Date();
  date = date.addDays(exdays);
  date = date.toUTCString();
  let expires = "expires=" + date;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

const getCookie = cname => {
  const name = `${cname}=`;
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name)) {
      return cookie.substr(name.length, cookie.length);
    }
  }
};

const storeRefresh = refreshToken => {
  setCookie("refreshToken", refreshToken, 1);
};

/**
 * @param {Number} days
 */
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const handleLogin = ({ email, password }) => {
  if (email && password) {
    Axios.post(`http://localhost:5000/api/users/login`, {
      email: email,
      password: password
    })
      .then(({ data }) => {
        console.log({ data });
        setToken(data.token);
        storeRefresh(data.refreshToken);
        getUser();
      })
      .catch(err => console.log(err));
  }
  return false;
};

export const isLoggedIn = () => {
  const user = getUser();
  if (user) {
    return user;
  }
};

export const logout = callback => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  callback();
};
