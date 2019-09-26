import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "@reach/router";

const Player = ({ playerId }) => {
  const [player, setPlayer] = useState({});

  const getPlayer = playerId => {
    Axios.get(`/api/players/${playerId}`)
      .then(({ data }) => {
        setPlayer({
          _id: data._id,
          name: data.name,
          flag: data.flag,
          squadNumber: data.squadNumber,
          postion: data.postion,
          team: data.team,
          bio: data.bio.split("\n").map((line, i) => <p key={i}>{line}</p>),
          thumbnail: data.thumbnail,
          image: data.image,
          twitter: data.twitter,
          instagram: data.instagram
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPlayer(playerId);
  }, [playerId]);

  return (
    <>
      <h2>{player.name}</h2>
      <div>
        <h3>Bio</h3>
        {player.bio}
      </div>
      <div>
        <Link to="edit">Edit</Link>
      </div>
    </>
  );
};

export default Player;
