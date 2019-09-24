import React, { useState } from "react";
import Axios from "axios";
import { redirectTo, navigate } from "@reach/router";

import NewSongForm from "forms/NewSongForm";

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

  const handelFormSubmit = e => {
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
      <NewSongForm
        values={values}
        handelFormSubmit={handelFormSubmit}
        handleInputChange={handleInputChange}
        resetForm={resetForm}
      />
    </>
  );
};

export default NewSong;
