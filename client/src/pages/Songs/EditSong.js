import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import SongForm from 'forms/SongForm';
import { navigate } from '@reach/router'

const EditSong = ({ songId }) => {
  const [song, setSong] = useState({})
  // const [error, setError] = useState(null)

  useEffect(_ => {
    getSong(songId)
  }, [songId])

  const handleFormSubmit = e => {
    e.preventDefault()
    Axios.put(`/api/song/${songId}`, song)
      .then(res => navigate(`/songs/${songId}`))
      .catch(err => console.log(err));
  }

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSong({...song, [name]: value });
  }

  const getSong = (songId) => {
    Axios.get(`/api/song/${songId}`)
      .then(({data}) => setSong(data))
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2>Edit {song.title}</h2>
      <SongForm
        values={song}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        edit="true"/>
    </>
  )
}

export default EditSong