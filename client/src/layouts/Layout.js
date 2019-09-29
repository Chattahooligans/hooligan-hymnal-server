import React, { useContext } from "react";
import { Link } from "@reach/router";

import Sidebar from "components/Sidebar";
import { UserContext } from "providers/UserContext";

const Layout = ({ children }) => {
  const { user, isLoggedIn, logout } = useContext(UserContext);

  return (
    <>
      <header
        style={{
          padding: ".3em",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h1>
          <Link to="/">Hymnal Admin</Link>
        </h1>
        <nav>
          {!isLoggedIn() ? (
            <>
              <Link to="/users/register">Register</Link> |{" "}
              <Link to="/users/login">Login</Link>
            </>
          ) : (
            <>
              <span>Hello {user.email}</span> |{" "}
              <a
                href="/"
                onClick={e => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </>
          )}
        </nav>
      </header>
      <section
        style={{
          display: "flex"
        }}
      >
        <Sidebar />
        <main id="main">{children}</main>
      </section>
    </>
  );
};

export default Layout;
