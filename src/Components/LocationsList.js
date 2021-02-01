import React from "react";
import "../Styles/App.css";

const LocationsList = (props) => {
  const handleClick = (location) => {
    props.onSelection(location);
  };
  return (
    <>
      {props.locationsList && props.locationsList.length > 0
        ? props.locationsList.map((location, index) => {
            return (
              <div
                className="locations-location"
                key={location.address}
                onClick={() => handleClick(location.address)}
              >
                <i
                  className="fas fa-map-marker"
                  style={{ fontSize: "16px", padding: "2px 4px 2px 4px" }}
                ></i>
                {location.address}
              </div>
            );
          })
        : null}
    </>
  );
};

export default LocationsList;
