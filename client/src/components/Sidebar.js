import React, { useContext } from "react";
import { Link } from "@reach/router";
import { UserContext } from "providers/UserContext";

const Sidebar = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  return (
    <aside>
      <nav
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* TODO: Add checks if you have the correct rights */}
        {isLoggedIn() && (
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
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
