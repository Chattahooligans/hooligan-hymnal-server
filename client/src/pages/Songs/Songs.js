import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "@reach/router";

const Songs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, [setSongs]);

  const getSongs = () => {
    Axios.get("/api/songs")
      .then(({ data }) => {
        setSongs(data);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <h1>Songs</h1>
      {songs.length > 0 ? (
        <>
          <h2>All Songs</h2>
          <div>
            <ul>
              {songs.map(song => (
                <li key={song._id}>
                  <Link to={song._id}>{song.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <h2>No Songs Currently</h2>
      )}
    </>
  );
};

export default Songs;
