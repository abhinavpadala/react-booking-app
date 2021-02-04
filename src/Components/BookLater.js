import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookLater = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const subDays = (date, value) => {
    return date.setDate(date.getDate() - value);
  };
  const addDays = (date, value) => {
    return date.setDate(date.getDate() + value);
  };

  const updateTs = () => {
    props.updateTs(Math.floor(startDate.getTime() / 1000));
  };
  return (
    <div>
      <div onClick={updateTs}>
        <i
          className="fas fa-clock"
          style={{ fontSize: "16px", padding: "2px 4px 2px 4px" }}
        ></i>
        Plan Booking
      </div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          minDate={subDays(new Date(), 0)}
          maxDate={addDays(new Date(), 3)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </div>
  );
};

export default BookLater;
