import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { toast } from "react-toastify";

function CoworkCalendarView({ data, spaceDetails }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate()



  const getLeftSpaceForDate = (date) => {
    // Use moment-timezone for timezone conversion
    const localDate = moment.tz(date, 'Asia/Kolkata');
  
    const formattedSelectedDate = localDate.format('YYYY-MM-DD');
  
    if (!data) {
      return spaceDetails.slots;
    }
  
    const selectedData = data.find(
      (entry) => entry.date === formattedSelectedDate
    );
  
    return selectedData ? selectedData.left_space : spaceDetails.slots;
  };
  
      
  
  const customDayCell = ({ date }) => {
    const leftSpace = getLeftSpaceForDate(date);
    const isZeroOrNegative = leftSpace <= 0;
  
    return (
      <div>
        {leftSpace !== null && (
          <p style={{ color: isZeroOrNegative ? "red" : "green" }}>
            {leftSpace}
          </p>
        )}
      </div>
    );
  };
  

  const selectedDay = (date) => {
    // Handle selected day logic
    if (date <= new Date() || getLeftSpaceForDate(date) <= 0) {
        // Do not update the selected date if it's today or in the past,
        // or if the leftSpace is 0 or less
        toast.error("Slots are full in this date")
        return;
      }
  };

  const handleBooking = () => {
    // Check if a date is selected
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    } else {
      const data = {
        date: selectedDate,
        spaceDetails: spaceDetails,
      };

      navigate("/user/spacedetails/checkout", { state: { data: data } });
    }
  };

  

  return (
    <div>
    <Calendar
      onChange={selectedDay}
      value={selectedDate}
      tileContent={customDayCell}
      selectRange={false}
      tileDisabled={({ date }) => date <= new Date() || getLeftSpaceForDate(date) <= 0}
    />
    {selectedDate ? (
      <>
        <p>Date: {selectedDate.toLocaleDateString()}</p>
        <button onClick={handleBooking} className="bg-blue-500 text-white p-2 rounded-md">Click To Proceed</button>
      </>
    ) : null}
  </div>
  );
}

export default CoworkCalendarView;
