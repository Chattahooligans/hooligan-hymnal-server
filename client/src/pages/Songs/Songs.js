import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Layout from 'layouts/Layout';

const Songs = () => {
  const [songs, setSongs] = useState({ songs: [] });

  useEffect(() => {
    Axios.get('/api/songs')
      .then(({ data }) => {
        console.log(data)
        setSongs(data)
      })
      .catch(err => console.error(err))
  }, [setSongs])

  return (
    <Layout
      title="All Songs">
      <h1>Songs</h1>
      {songs.length ? (
        <h2>All Songs</h2>
      ) : (
        <h2>No Songs Currently</h2>
      )}
    </Layout>
  )
}

export default Songs