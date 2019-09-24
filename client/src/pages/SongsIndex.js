import React from 'react'
import { Link } from '@reach/router'
import Layout from 'layouts/Layout';

const SongsIndex = ({ children }) => (
  <Layout>
    <div>
      <Link to="new">New Song</Link>
    </div>
    {children}
  </Layout>
)

export default SongsIndex