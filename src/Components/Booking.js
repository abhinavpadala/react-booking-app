import React, { useState, useEffect } from "react";
import "../Styles/App.css";
import SearchBar from "./SearchBar";
import LocationsList from "./LocationsList";
import { data } from "./Seed";
import Estimate from "./Estimate";
import Book from "./Book";
import BookLater from "./BookLater";
import { getEstimate } from "../API/GetEstimate";
import { requestRide } from "../API/RequestRide";

const Booking = () => {
  const [keyword, setKeyword] = useState("");
  const [locationsList, setLocationsList] = useState();
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();
  const [showLocations, setShowLocations] = useState(true);

  const [headerText, setHeaderText] = useState("Where can we pick you up?");
  const [estimate, setEstimate] = useState(undefined);

  useEffect(() => {
    if (fromLocation && toLocation) {
      async function callGetEstimate() {
        const estimate = getEstimate(
          fromLocation,
          toLocation,
          Math.floor(Date.now() / 1000)
        );
        setEstimate(await estimate);
      }
      callGetEstimate();
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
    setFromLocation(undefined);
  };

  const handleDrop = () => {
    setToLocation(undefined);
  };

  async function reqRide() {
    if (!estimate) {
      return;
    }
    const booking = await requestRide(estimate);
    console.log(booking);
  }

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
      {estimate && fromLocation && toLocation ? (
        <div className="booking-estimate">
          <Estimate estimate={estimate} />
        </div>
      ) : null}
      {/* {estimate && fromLocation && toLocation ? (
        <div className="booking-now" onClick={reqRide}>
          <Book />
        </div>
      ) : null} */}
      {fromLocation && toLocation ? (
        <div className="booking-later">
          <BookLater />
        </div>
      ) : null}
    </div>
  );
};

export default Booking;
