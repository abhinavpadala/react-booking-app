import React, { useState, useEffect } from "react";
import "../Styles/App.css";
import SearchBar from "./SearchBar";
import LocationsList from "./LocationsList";
import { data } from "./Seed";
import Book from "./Book";
import BookLater from "./BookLater";
import { bookRide } from "../API/BookRide";

const Booking = () => {
  const [keyword, setKeyword] = useState("");
  const [locationsList, setLocationsList] = useState();
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();
  const [showLocations, setShowLocations] = useState(true);

  const [headerText, setHeaderText] = useState("Where can we pick you up?");

  useEffect(() => {
    if (fromLocation && toLocation) {
      bookRide(fromLocation, toLocation, Math.floor(Date.now() / 1000));
    }
  }, [fromLocation, toLocation]);

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

  const handlePickup = () => {
    setFromLocation("");
  };

  const handleDrop = () => {
    setToLocation("");
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        {fromLocation ? (
          <div
            className="booking-header-item"
            onClick={handlePickup}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              paddingBottom: "5px",
            }}
          >
            From: {fromLocation}
          </div>
        ) : (
          headerText
        )}

        {toLocation ? (
          <div
            className="booking-header-item"
            onClick={handleDrop}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            To: {toLocation}
          </div>
        ) : null}
      </div>

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
      {/* {fromLocation && toLocation ? (
        <div className="booking-now">
          <Book />
        </div>
      ) : null}
      {fromLocation && toLocation ? (
        <div className="booking-later">
          <BookLater />
        </div>
      ) : null} */}
    </div>
  );
};

export default Booking;
