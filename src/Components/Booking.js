import React, { useState } from "react";
import "../Styles/App.css";
import SearchBar from "./SearchBar";
import LocationsList from "./LocationsList";
import { data } from "./Seed";

const Booking = () => {
  const [keyword, setKeyword] = useState("");
  const [locationsList, setLocationsList] = useState();
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();
  const [showLocations, setShowLocations] = useState(true);

  const headerText = {
    pickup: "Where can we pick you up?",
  };

  const updateKeyword = async (input) => {
    const filteredLocations = data.filter((location) => {
      if (!input) {
        return null;
      }
      return location.address.toLowerCase().includes(input.toLowerCase());
    });
    setKeyword(input);
    setShowLocations(true);
    setLocationsList(filteredLocations);
  };

  const onSelection = (location) => {
    setKeyword("");
    setShowLocations(false);
    if (!fromLocation) {
      setFromLocation(location);
    } else {
      setToLocation(location);
    }
  };

  console.log(keyword);
  return (
    <div className="booking-container">
      <div className="booking-header">
        {fromLocation ? "From: " + fromLocation : headerText["pickup"]}
        <br />
        {toLocation ? "To: " + toLocation : null}
      </div>
      <div>
        {!fromLocation || !toLocation ? (
          <div className="booking-search">
            <SearchBar keyword={keyword} onChange={updateKeyword} />
          </div>
        ) : null}
        {showLocations ? (
          <div className="booking-locations">
            <LocationsList
              locationsList={locationsList}
              onSelection={onSelection}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Booking;
