import React from "react";
import TextInput from "components/TextInput";
import TextAreaInput from "components/TextAreaInput";

const SongForm = ({
  values,
  handleFormSubmit,
  handleInputChange,
  resetForm,
  edit
}) => {
  return (
    <form onSubmit={handleFormSubmit} method="POST">
      <div>
        <TextInput
          type="text"
          target="title"
          label="Title"
          placeholder="Title"
          value={values.title}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextAreaInput
          target="lyrics"
          label="Lyrics"
          placeholder="Lyrics Here"
          value={values.lyrics}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="category"
          label="Category"
          placeholder="Category"
          value={values.category}
          handleInputChange={handleInputChange}
          required="true"
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="instructions"
          label="Instructions"
          placeholder="Instructions"
          value={values.instructions}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="capoSignal"
          label="Capo Signal"
          placeholder="Capo Signal"
          value={values.capoSignal}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="delete_local"
          label="Delete Local"
          placeholder="Delete Local"
          value={values.delete_local}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="sheetMusicLink"
          label="Sheet Music Link"
          placeholder="http://sheetmusic.link"
          value={values.sheetMusicLink}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="reference_title"
          label="Reference Link"
          placeholder="Reference Link"
          value={values.reference_link}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="reference_link"
          label="Reference Link"
          placeholder="Reference Link"
          value={values.reference_link}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="player_id"
          label="Player ID"
          placeholder="Player Id"
          value={values.player_id}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <TextInput
          type="text"
          target="legend"
          label="Legend"
          placeholder="Legend"
          value={values.legend}
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        {!edit ? (
          <button type="submit" onClick={handleFormSubmit}>
            Add Song
          </button>
        ) : (
          <button type="submit" onClick={handleFormSubmit}>
            Update {values.title}
          </button>
        )}
        <button type="reset" onClick={resetForm}>
          Reset Form
        </button>
      </div>
    </form>
  );
};

export default SongForm;
