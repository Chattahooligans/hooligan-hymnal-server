import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SongbookForm = () => {
  const [songbook, setSongbook] = useState({});
  const handleInput = ({ target: { name, value } }) => {
    console.log(name, value);
  };
  return (
    <>
      <form method="POST">
        <div className="flex flex-col mb-3">
          <label htmlFor="name">
            Name
            <input type="text" name="name" id="name" className="border block" />
          </label>
        </div>
      </form>
    </>
  );
};

// eslint-disable-next-line no-undef
ReactDOM.render(<SongbookForm />, document.querySelector('#songbookForm'));
