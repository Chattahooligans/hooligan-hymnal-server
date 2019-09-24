import React from 'react';
import { Router } from '@reach/router'

import SongsIndex from 'pages/SongsIndex';
import Songs from 'pages/Songs/Songs';


const SongsRouter = () => (
  // <Router>
    <SongsIndex path="songs">
      <Songs path="/" />
    </SongsIndex>
  // </Router>
)

export default SongsRouter