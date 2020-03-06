import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const SongbookForm = () => {
  const [songbook, setSongbook] = useState({
    songbook_title: '',
    organization: '',
    description: '',
    front_cover: '',
    back_cover: '',
    chapters: [],
  });

  const [chapters, setChapters] = useState([]);
  const [allSongs, setAllSongs] = useState([]);

  const [newChapter, setNewChapter] = useState({
    chapter_title: '',
  });
  const [newSongs, setSongs] = useState({
    featured: false,
    hint: '',
  });

  useEffect(() => {
    const songs = document.getElementById('songs').innerHTML;
    const songsJSON = JSON.parse(songs);
    setAllSongs(songsJSON);
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    setSongbook({
      ...songbook,
      [name]: value,
    });
  };

  const updateChapterTitle = ({ target: { name, value } }) => {
    setNewChapter({
      chapter_title: value,
    });
  };
  return (
    <>
      <h2>Songs</h2>
      <Formik
        initialValues={songbook}
        validationSchema={Yup.object({
          songbook_title: Yup.string().required('Title is required'),
          organization: Yup.string().required('Organization is required'),
          description: Yup.string().required('Description is required').max(140),
        })}
      >
        <>
          <label htmlFor="songbook_title" className="flex flex-col mb-3">
            Songbook Title
            <Field name="songbook_title" type="text" id="songbook_title" className="border flex-auto rounded p-2 shadow" />
          </label>
          <small className="text-red-700">
            <ErrorMessage name="songbook_title" />
          </small>
          <label htmlFor="organization" className="flex flex-col mb-3">
            Organization
            <Field name="organization" type="text" id="organization" className="border flex-auto rounded p-2 shadow" />
            <small className="text-red-700">
              <ErrorMessage name="organization" />
            </small>
          </label>
          <label htmlFor="description" className="flex flex-col mb-3">
            description
            <Field name="description" component="textarea" id="description" className="border flex-auto rounded p-2 shadow" />
            <small className="text-red-700">
              <ErrorMessage name="description" />
            </small>
          </label>
        </>
      </Formik>
    </>
  );
};

// eslint-disable-next-line no-undef
render(<SongbookForm />, document.querySelector('#songbookForm'));
