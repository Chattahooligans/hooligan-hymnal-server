import React, { useState } from "react";
import Axios from 'axios'

const CreatePlayer = () => {
  const [player, setPlayer] = useState({
    name: "",
    flag: "",
    squadNumber: "",
    postion: "",
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
    Axios.post("/api/players".player)
      .then(res => {
        console.log(res);
      })
      .catch(res => console.log(res));
  };
  return (
    <>
      <h2>Create {player.name ? player.name : "Player"}</h2>
      <form method="POST" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={player.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <lable htmlFor="flag">Flag</lable>
          <br />
          <input
            type="text"
            name="flag"
            id="flag"
            placeholder="flag"
            value={player.flag}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="squadNumber">Squad Number</label>
          <br />
          <input type="number" name="squadNumber" id="squadNumber" placeholder="Squad Number" value={player.squadNumber} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <br />
          <input type="text" name="position" id="position" value={player.position} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="team">Team</label>
          <br />
          <input type="text" name="team" id="team" placeholder="team" onChange={handleInputChange} value={player.team} />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <br />
          <textarea name="bio" id="bio" value={player.bio} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <br />
          <input type="text" name="thumbnail"  id="thumbnail" value={player.thumbnail} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <br />
          <input type="text" name="image" id="image" value={player.image} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="twitter">Twitter</label>
          <br />
          <input type="text" id="twitter" name="twitter" value={player.twitter} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="instagram">Instagram</label>
          <br />
          <input type="text" name="instagram" id="instagram" value={player.instagram} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Create {player.name ? "Player" : player.name}</button>
        </div>
      </form>
    </>
  );
};

export default CreatePlayer
