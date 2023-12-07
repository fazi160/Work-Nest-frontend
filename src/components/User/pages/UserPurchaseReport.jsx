import React, { useEffect } from "react";

import axios from "axios";
import { Card, Typography, FormControl } from "@mui/material";
import { BaseUrl } from "../../../constants/constants";
function UserPurchaseReport({ userId }) {
  console.log("UserPurchaseReport has called");
  // const userId = match.params.userId;
  const [bookingData, setBookingData] = React.useState(null);

  const sortByDate = (a, b) => {
    return new Date(a.booking_date) - new Date(b.booking_date);
  };
  
  useEffect(() => {
    axios
      .get(`${BaseUrl}/space/user/purchase/${userId}/`)
      .then((response) => {
        console.log(response);
        const sortedConferenceHallBookings =
          response.data.conference_hall_bookings.sort(sortByDate);
        const sortedCoworkSpaceBookings =
          response.data.cowork_space_bookings.sort(sortByDate);

        setBookingData({
          conference_hall_bookings: sortedConferenceHallBookings,
          cowork_space_bookings: sortedCoworkSpaceBookings,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  return (
    <>
      <h2 className="flex justify-center text-center text-lg"> Bookings</h2>
      <br />
      <div className="flex align-center text-center">
        {bookingData && (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-2">Space Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Booking Date</th>
                <th className="py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.conference_hall_bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.hall_detail.name}</td>
                  <td>{booking.price}</td>
                  <td>{booking.booking_date}</td>
                  <td>{JSON.parse(booking.hall_detail.location).city}</td>
                </tr>
              ))}
              {bookingData.cowork_space_bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.space_details.name}</td>
                  <td>{booking.price}</td>
                  <td>{booking.booking_date}</td>
                  <td>{JSON.parse(booking.space_details.location).city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default UserPurchaseReport;
