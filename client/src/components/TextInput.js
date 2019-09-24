import React from "react";
const TextInput = ({
  target,
  label,
  type,
  placeholder,
  value,
  handleInputChange
}) => {
  // TODO: Add optional required
  return (
    <>
      <label htmlFor={target}>{label}</label>
      <br />
      <input
        type={type}
        name={target}
        id={target}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
};

export default TextInput;
