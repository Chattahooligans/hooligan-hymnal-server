import React, { useState } from 'react'
const Rosters = () => {
  const [rosters, setRosters] = useState({})
  return (
    <>
      <h2>Rosters</h2>
      {rosters.length > 0 && (
        <div>
          {rosters.map((roster) => {
            <div key={roster._id}>{roster.name}</div>
          })}
        </div>
      )}
    </>
  )
}

export default Rosters;