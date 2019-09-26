import React, { useState, useEffect } from "react";
import { Link, redirectTo, navigate } from "@reach/router";
import Axios from "axios";

const Song = ({ songId }) => {
  const [song, setSong] = useState({});

  useEffect(() => {
    getSong(songId);
  }, [songId]);

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
        <Link to="edit">Edit</Link> |{" "}
        <button onClick={deleteSong}>Delete</button>
      </div>
      <div>
        {song.lyrics &&
          song.lyrics.split("\n").map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </>
  );
};

export default Song;
