import React, { useState } from "react";
import Axios from "axios";
import { navigate } from "@reach/router";

import SongForm from "forms/SongForm";

const NewSong = () => {
  const [values, setValues] = useState({
    title: "",
    lyrics: "",
    category: "",
    instructions: "",
    capoSignal: "",
    delete_local: "",
    sheetMusicLink: "",
    reference_title: "",
    reference_link: "",
    player_id: "",
    legend: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    Axios.post("/api/song", values)
      .then(({ data }) => {
        navigate(`${data._id}`);
      })
      .catch(res => console.log(res));
  };

  const resetForm = e => {
    e.preventDefault();
    setValues({
      title: "",
      lyrics: "",
      category: "",
      instructions: "",
      capoSignal: "",
      delete_local: "",
      sheetMusicLink: "",
      reference_title: "",
      reference_link: "",
      player_id: "",
      legend: ""
    });
  };

  return (
    <>
      <h2>New Song</h2>
      <SongForm
        values={values}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        resetForm={resetForm}
      />
    </>
  );
};

export default NewSong;
