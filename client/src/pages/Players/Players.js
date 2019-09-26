import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Axios from "axios";
const Players = () => {
  const [players, setPlayers] = useState({});

  const getPlayers = () => {
    Axios.get("/api/players")
      .then(({ data }) => setPlayers(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPlayers();
  }, [setPlayers]);

  return (
    <>
      <h2>All Players</h2>
      <br />
      <Link to="/players/create">Create Player</Link>
      {players.length > 0 ? (
        <div>
          {players.map(player => (
            <div key={player._id}>
              <Link to={`/players/${player._id}`}>{player.name}</Link>
            </div>
          ))}
        </div>
      ) : (
        <h3>No Players currently</h3>
      )}
    </>
  );
};

export default Players;
