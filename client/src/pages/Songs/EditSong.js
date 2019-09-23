import React from 'react'

const EditSong = () => {
  const onSubmit = e => {
    e.preventDefault()
  }
  return (
    <>
      <h2>Edit Song</h2>
      <form onSubmit={e => onSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" placeholder="title" />
      </form>
    </>
  )
}

export default EditSong