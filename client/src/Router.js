import React from 'react'
import { Router } from '@reach/router';

import Home from 'pages/Home';
import Songs from 'pages/Songs/Songs';
import Song from 'pages/Songs/Song';
import NotFound from 'pages/NotFound';

const AppRouter = () => (
  <Router>
    <NotFound default />
    <Home path="/" />
    <Songs path="songs" />
    <Song path="songs/:songId" />
  </Router>
);

export default AppRouter