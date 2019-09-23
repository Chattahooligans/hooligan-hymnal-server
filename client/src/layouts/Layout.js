import React, { useEffect } from 'react'
import { Link } from '@reach/router'

const Layout = ({ title, children }) => {
  useEffect(() => {
    if (title) document.title = `${title}`
  })
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/songs">All Songs</Link>
        </nav>
      </header>
      <main id="main">
        {children}
      </main>
    </>
  )
};

export default Layout