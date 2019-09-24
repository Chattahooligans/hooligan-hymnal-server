import React from "react";

const TextAreaInput = ({
  target,
  label,
  placeholder,
  value,
  handleInputChange
}) => {
  return (
    <>
      <label htmlFor={target}>{label}</label>
      <br />
      <textarea
        name={target}
        id={target}
        cols="30"
        rows="10"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      ></textarea>
    </>
  );
};

export default TextAreaInput;
