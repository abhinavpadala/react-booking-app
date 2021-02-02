import React from "react";

const SearchBar = (props) => {
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
    height: "30px",
    fontSize: "medium",
  };
  return (
    <input
      style={BarStyling}
      key="random1"
      value={props.keyword}
      placeholder={"Add location"}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default SearchBar;
