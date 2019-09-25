import React from "react";
import { Router, Redirect } from "@reach/router";

import Home from "pages/Home";
import Songs from "pages/Songs/Songs";
import Song from "pages/Songs/Song";
import NotFound from "pages/NotFound";
import SongsIndex from "pages/SongsIndex";
import EditSong from "pages/Songs/EditSong";
import NewSong from "pages/Songs/NewSong";
// Index pages
import SongBookIndex from "pages/SongBook/SongBookIndex";
import PlayersIndex from "pages/Players/PlayersIndex";
import RosterIndex from "pages/Roster/RosterIndex";
import GoalKeeperNicknameIndex from "pages/GoalKeeperNickname/GoalKeeperNicknameIndex";
import FoesIndex from "pages/Foes/FoesIndex";
import UsersIndex from "pages/Users/UsersIndex";

import Register from "pages/Users/Register";
import Login from "pages/Users/Login";

const AppRouter = () => (
  <Router>
    <NotFound default />
    <Home path="/" />
    {/* <Redirect from="register" to="/users/register" /> */}
    <SongsIndex path="songs">
      <Songs path="/" />
      <NewSong path="new" />
      <Song path=":songId" />
      <EditSong path=":songId/edit" />
    </SongsIndex>
    <SongBookIndex path="song-books">
      {/* Add Songbooks routes here */}
    </SongBookIndex>
    <PlayersIndex path="players">{/* Add Players routes here */}</PlayersIndex>
    <RosterIndex path="roster">{/* Add Roster routes here */}</RosterIndex>
    <GoalKeeperNicknameIndex path="goalkeeper-nickname">
      {/* Add GoalKeeperNickname routes here */}
    </GoalKeeperNicknameIndex>
    <FoesIndex path="foes">{/* Add Foes routes here */}</FoesIndex>
    <UsersIndex path="users">
      <Register path="register" />
      <Login path="login" />
      {/* Add Users routes here */}
    </UsersIndex>
  </Router>
);

export default AppRouter;
