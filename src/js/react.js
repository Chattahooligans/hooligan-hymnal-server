import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Formik, Form, Field } from 'formik';

const SongbookForm = () => {
  const [songbook, setSongbook] = useState({});
  const handleInput = ({ target: { name, value } }) => {
    console.log(name, value)
  }
  return (
    <form>
      <div className="flex flex-col mb-3">
        <label htmlFor="songbook_title">Title</label>
        <input type="text" className="border" id="songbook_title" name="songbook_title" value={songbook.songbook_title} onChange={handleInput} />
      </div>
    </form>
  )
}

ReactDOM.render(<SongbookForm />, document.querySelector('#songbookForm'));
