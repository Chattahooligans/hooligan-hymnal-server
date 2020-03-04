import React, { useState } from 'react';
import { render } from 'react-dom';

// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

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
  const [newChapter, setNewChapter] = useState({
    chapter_title: '',
  });
  const [newSongs, setSongs] = useState({
    featured: false,
    hint: '',
  });

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
      <form method="POST">
        <div className="flex flex-col mb-3">
          <label htmlFor="name">
            Name
            <input type="text" name="name" id="name" className="border block" onChange={handleInput} value={songbook.name} />
          </label>
        </div>
      </form>
      <div>
        <input type="text" name="chapters" id="chapters" className="border block" value={newChapter.chapter_title} onChange={updateChapterTitle} />
        <button
          type="button"
          onClick={(e) => {
            setSongbook({
              ...songbook,
              chapters: [
                ...songbook.chapters,
                {
                  chapter_title: newChapter.chapter_title,
                  songs: [],
                },
              ],
            });
            setNewChapter({
              chapter_title: '',
            });
          }}
        >
          &plus;

        </button>
      </div>
      <ul>
        {songbook.chapters.map((chapter, index) => (
          <li key={index}>
            {chapter.chapter_title}
            <div>
              <input type="text" id="hint" name="hint" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

// eslint-disable-next-line no-undef
render(<SongbookForm />, document.querySelector('#songbookForm'));
