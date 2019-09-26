import React, { useState } from "react";
import Axios from "axios";
import { navigate } from "@reach/router";
import PlayerForm from "forms/PlayerForm";

const CreatePlayer = () => {
  const [player, setPlayer] = useState({
    name: "",
    flag: "",
    squadNumber: "",
    position: "",
    team: "",
    bio: "",
    thumbnail: "",
    image: "",
    twitter: "",
    instagram: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    Axios.post("/api/players", player)
      .then(({ data }) => {
        navigate(`${data._id}`);
      })
      .catch(res => console.log(res));
  };

  const handleFormReset = () => {
    setPlayer({
      name: "",
      flag: "",
      squadNumber: "",
      position: "",
      team: "",
      bio: "",
      thumbnail: "",
      image: "",
      twitter: "",
      instagram: ""
    });
  };
  return (
    <>
      <h2>Create {player.name ? player.name : "Player"}</h2>
      <PlayerForm
        values={player}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        formReset={handleFormReset}
      />
    </>
  );
};

export default CreatePlayer;
