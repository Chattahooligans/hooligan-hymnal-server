import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../services/auth";

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {}, []);

  return <context.Provider value={userData}>{children}</context.Provider>;
};

export default UserProvider;
