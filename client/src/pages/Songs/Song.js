import React, { useState, useEffect } from 'react'
import { redirectTo } from '@reach/router'
import Layout from 'layouts/Layout'
import Axios from 'axios';
import NotFound from 'pages/NotFound';

const Song = ({ songId }) => {
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSong(songId)
  })

  const getSong = (songId) => {
    Axios.get(`/song/${songId}`)
      .then(({ data }) => setSong(data))
      .catch(err => console.error(err))
    console.log(`Getting Song ${songId}`)
  }

  return (
    // <Layout
    //   title={`${song.title}`}>
    <>
        {song.length ? (
          <h2>{song.title}</h2>
        ) : (
          <h2>No song with id: {songId}</h2>
        )}
      </>
    // </Layout>
  )
}

export default Song;