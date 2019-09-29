import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";

const Sidebar = user => {
  return (
    <aside>
      <nav
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* TODO: Add checks if you have the correct rights */}
        <Link to="/songs">All Songs</Link>
        <Link to="/song-books">Song Books</Link>
        <Link to="/players">Players</Link>
        <Link to="/roster">Roster</Link>
        <Link to="/goalkeeper-nickname">Goalkeeper Nickname</Link>
        <Link to="/foes">Foes</Link>
        <Link to="/users">Users</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
