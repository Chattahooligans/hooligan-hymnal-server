import React, { useContext } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "providers/UserContext";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { isLoggedIn } = useContext(UserContext);
  setTimeout(() => {
    if (isLoggedIn() !== undefined) {
      if (!isLoggedIn() && location.pathname !== `/user/login`) {
        navigate(`/users/login`);
      }
    }
  }, 10);
  return <Component {...rest} />;
};

export default PrivateRoute;
