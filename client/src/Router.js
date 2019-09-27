import React from "react";
import { Router } from "@reach/router";

import PrivateRoute from "components/PrivateRoute";

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
import Players from "pages/Players/Players";
import Player from "pages/Players/Player";
import CreatePlayer from "pages/Players/CreatePlayer";
import EditPlayer from "pages/Players/EditPlayer";
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
    <PrivateRoute path="songs" component={SongsIndex}>
      <Songs path="/" />
      <NewSong path="new" />
      <Song path=":songId" />
      <EditSong path=":songId/edit" />
    </PrivateRoute>
    <PrivateRoute path="song-books" component={SongBookIndex}>
      {/* Add Songbooks routes here */}
    </PrivateRoute>
    <PrivateRoute path="players" component={PlayersIndex}>
      <Players path="/" />
      <CreatePlayer path="create" />
      <Player path=":playerId" />
      <EditPlayer path=":playerId/edit" />
    </PrivateRoute>
    <PrivateRoute path="roster" component={RosterIndex}>
      {/*  */}
    </PrivateRoute>
    <PrivateRoute
      path="goalkeeper-nickname"
      component={GoalKeeperNicknameIndex}
    >
      {/*  */}
    </PrivateRoute>
    <PrivateRoute path="foes" component={FoesIndex}>
      {/*  */}
    </PrivateRoute>
    <UsersIndex path="users">
      <Register path="register" />
      <Login path="login" />
    </UsersIndex>
  </Router>
);

export default AppRouter;
