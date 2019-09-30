import React, { useState } from '@reach/router'

const Roster = () => {
  const [players, setPlayers] = useState({});
  return (
    <>
      <h2>Roster</h2>
      {players.map((player) => (
        <div key={player._id}>{player.name}</div>
      ))}
    </>
  )
}

export default Roster;