import React from "react";
import TextInput from "components/TextInput";
import TextArea from "components/TextAreaInput";
import { Link } from "@reach/router";

const PlayerForm = ({
  values,
  handleInputChange,
  handleFormSubmit,
  formReset,
  edit
}) => {
  return (
    <>
      <form method="POST" onSubmit={handleFormSubmit}>
        <div>
          <TextInput
            type="text"
            label="Name"
            target="name"
            placeholder="Name"
            value={values.name}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="text"
            label="Flag"
            target="flag"
            placeholder="Flag"
            value={values.flag}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="number"
            label="Squad Number"
            target="squadNumber"
            placeholder="Squad Number"
            value={values.squadNumber}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="text"
            label="Position"
            target="position"
            placeholder="Position"
            value={values.position}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="text"
            label="Team"
            target="team"
            placeholder="Team"
            value={values.team}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextArea
            label="Bio"
            target="bio"
            placeholder="Player Bio"
            value={values.bio}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="url"
            target="thumbnail"
            label="Thumbnail URL"
            value={values.thumbnail}
            placeholder="http://thumbnail.url"
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="url"
            target="image"
            label="Image URL"
            placeholder="http://image.url"
            value={values.image}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="url"
            target="twitter"
            label="Twitter Profile URL"
            placeholder="Twitter Profile URL"
            value={values.twitter}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          <TextInput
            type="url"
            target="instagram"
            label="Instagram Profile URL"
            placeholder="Instagram Profile URL"
            value={values.instagram}
            handleInputChange={handleInputChange}
          />
        </div>
        <div>
          {!edit ? (
            <>
              <button type="submit">Save {values.name}</button> {" | "}{" "}
              <button type="reset" onClick={formReset}>
                Reset
              </button>
            </>
          ) : (
            <>
              <button type="submit">Update {values.name}</button> {" | "}{" "}
              <Link to="../">Back</Link>
              {/* <button type="reset" onClick={() => navigate(-1)}>
                Back
              </button> */}
            </>
          )}
        </div>
      </form>
    </>
  );
};
export default PlayerForm;
