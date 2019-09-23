import React, { useState } from "react";
import Axios from "axios";

const NewSong = () => {
  const [values, setValues] = useState({
    title: "",
    lyrics: "",
    instructions: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handelFormSubmit = e => {
    e.preventDefault()
    Axios.post('/api/song', {
      values
    })
      .then(res => console.log(res))
      .catch(res => console.log(res))
  }
  return (
    <>
      <h2>New Song</h2>
      <form onSubmit={handelFormSubmit} method="POST">
        <div>
          <label htmlFor="title">Title</label>
          <br/>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            required
            onChange={handleInputChange}
            value={values.title}
          />
        </div>
        <div>
          <label htmlFor="lyrics">Lyrics</label>
          <br />
          <textarea
            name="lyrics"
            id="lyrics"
            placeholder="lyrics"
            required
            onChange={handleInputChange}
            value={values.lyrics}
          ></textarea>
        </div>
        <div>
          <label htmlFor="instructions">Instructions</label>
          <br />
          <input
            type="text"
            id="instructions"
            name="instructions"
            required
            onChange={handleInputChange}
            value={values.instructions}
          />
        </div>
        <div>
          <button type="submit">Add Song</button>
        </div>
      </form>
    </>
  );
};

export default NewSong;
