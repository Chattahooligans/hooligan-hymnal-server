import React, { useState, useEffect } from "react";
import { Link, redirectTo, navigate } from "@reach/router";
import Layout from "layouts/Layout";
import Axios from "axios";
import NotFound from "pages/NotFound";

const Song = ({ songId }) => {
  const [song, setSong] = useState({});

  useEffect(() => {
    getSong(songId);
  }, [setSong]);

  const getSong = songId => {
    Axios.get(`/api/song/${songId}`)
      .then(({ data }) => setSong(data))
      .catch(err => redirectTo("404"));
  };

  const deleteSong = () => {
    Axios.delete(`/api/song/${songId}`)
      .then(res => {
        alert(`${song.title} was deleted successfully`);
        navigate("/songs");
      })
      .catch(res => console.error(res));
  };

  return (
    <>
      <h2>{song.title}</h2>
      <div>
        <Link to={`${song._id}/edit`}>Edit</Link> |{" "}
        <button onClick={deleteSong}>Delete</button>
      </div>
      <div>{song.lyrics}</div>
    </>
  );
};

export default Song;
