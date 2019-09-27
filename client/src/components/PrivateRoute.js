import React from "react";
import { navigate } from "@reach/router";
import { isLoggedIn } from "services/auth";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/user/login`) {
    navigate(`/users/login`);
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
