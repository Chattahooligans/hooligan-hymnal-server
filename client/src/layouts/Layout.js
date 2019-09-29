import React, { useEffect, useContext, useState } from "react";
import { Link, navigate } from "@reach/router";

import Sidebar from "components/Sidebar";
import { isLoggedIn, getUser, logout } from "services/auth";

const Layout = ({ title, children }) => {
  const user = getUser();
  useEffect(() => {
    if (title) document.title = `${title}`;
  }, [title]);

  return (
    <>
      {isLoggedIn() ? (
        user && <span>Hello {user.email}</span>
      ) : (
        <span>Not Logged In</span>
      )}
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
            <a
              href="/"
              onClick={event => {
                event.preventDefault();
                logout(() => navigate("/users/login"));
              }}
            >
              Logout
            </a>
          )}
        </nav>
      </header>
      <section
        style={{
          display: "flex"
        }}
      >
        <Sidebar user={user} />
        <main id="main">{children}</main>
      </section>
    </>
  );
};

export default Layout;
