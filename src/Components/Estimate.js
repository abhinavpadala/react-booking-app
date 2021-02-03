import React from "react";

const Estimate = (props) => {
  if (props.estimate.name === "BadRequestError") {
    return null;
  }
  const styles = {
    flex: "33.3%",
  };
  var pickupTs = props.estimate.estimatedPickupTime.ts;
  var pickupDate = new Date(pickupTs * 1000);
  var pickupHours = pickupDate.getHours();
  pickupHours =
    pickupHours.toString().length > 1 ? pickupHours : "0" + pickupHours;
  var pickupMinutes = pickupDate.getMinutes();
  pickupMinutes =
    pickupMinutes.toString().length > 1 ? pickupMinutes : "0" + pickupMinutes;

  var dropoffTs = props.estimate.estimatedDropoffTime.ts;
  var dropoffDate = new Date(dropoffTs * 1000);
  var dropoffHours = dropoffDate.getHours();
  dropoffHours =
    dropoffHours.toString().length > 1 ? dropoffHours : "0" + dropoffHours;
  var dropoffMinutes = dropoffDate.getMinutes();
  dropoffMinutes =
    dropoffMinutes.toString().length > 1
      ? dropoffMinutes
      : "0" + dropoffMinutes;

  return (
    <>
      <div className="estimate-vehicle" style={styles}>
        <i
          className="fas fa-car-side"
          style={{ fontSize: "30px", padding: "2px 4px 2px 4px" }}
        />
      </div>
      <div
        className="estimate-time"
        style={{
          flex: "33.3%",
          fontSize: "12px",
          marginLeft: "0px",
          textAlign: "left",
        }}
      >
        <b>
          <div>
            Pick up at {pickupHours}:{pickupMinutes}
          </div>
          <div>
            Drop off at {dropoffHours}:{dropoffMinutes}
          </div>
        </b>
      </div>
      <div
        className="estimate-fare"
        style={{ flex: "33.3%", fontSize: "20px" }}
      >
        <b>USD {props.estimate.fare.cost} </b>
      </div>
    </>
  );
};

export default Estimate;
