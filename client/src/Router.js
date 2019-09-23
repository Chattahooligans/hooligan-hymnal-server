import React from 'react'
import { Router } from '@reach/router';

import Home from 'pages/Home';
import Songs from 'pages/Songs/Songs';
import Song from 'pages/Songs/Song';
import NotFound from 'pages/NotFound';
import SongsIndex from 'pages/SongsIndex';
import EditSong from 'pages/Songs/EditSong';
import NewSong from 'pages/Songs/NewSong';

const AppRouter = () => (
  <Router>
    <NotFound default />
    <Home path="/" />
    <SongsIndex path="songs">
      <Songs path="/" />
      <NewSong path="new" />
      <Song path=":songId" />
      <EditSong path=":songId/edit" />
    </SongsIndex>
    {/* <Songs path="songs" />
    <Song path="songs/:songId" /> */}
  </Router>
);

export default AppRouter