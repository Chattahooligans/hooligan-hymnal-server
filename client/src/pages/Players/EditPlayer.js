import React, { useState, useEffect } from "react";
import Axios from "axios";
import { navigate } from "@reach/router";

import PlayerForm from "forms/PlayerForm";
const EditPlayer = ({ playerId }) => {
  const [player, setPlayer] = useState({});

  const getPlayer = playerId => {
    Axios.get(`/api/players/${playerId}`)
      .then(({ data }) => {
        setPlayer(data);
      })
      .catch(res => console.log(res));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    Axios.put(`/api/players/${player._id}`, player)
      .then(({ data }) => navigate(`/players/${data._id}`))
      .catch(res => console.log(res));
  };

  useEffect(() => {
    getPlayer(playerId);
  }, [playerId, setPlayer]);

  return (
    <>
      <h2>Edit {player.name}</h2>
      <PlayerForm
        values={player}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        edit="true"
      />
    </>
  );
};

export default EditPlayer;
