import React, { useContext } from "react";
import { Link } from "@reach/router";
import { UserContext } from "providers/UserContext";

const Sidebar = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  return (
    <aside
      style={{
        maxWidth: "35%"
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        {isLoggedIn() &&
          (user.songbookAllowed ||
          user.rosterAllowed ||
          user.foesAllowed ||
          user.usersAllowed ? (
            <>
              {user.songbookAllowed && (
                <>
                  <Link to="/songs">All Songs</Link>
                  <Link to="/song-books">Song Books</Link>
                </>
              )}
              {user.rosterAllowed && (
                <>
                  <Link to="/players">Players</Link>
                  <Link to="/roster">Roster</Link>
                </>
              )}
              {user.foesAllowed && (
                <>
                  <Link to="/goalkeeper-nickname">Goalkeeper Nickname</Link>
                  <Link to="/foes">Foes</Link>
                </>
              )}
              {user.usersAllowed && <Link to="/users">Users</Link>}
            </>
          ) : (
            <h3>
              You have no rights, please contact your admin to gain rights
            </h3>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
