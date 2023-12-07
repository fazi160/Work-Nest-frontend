import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../../../constants/constants";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CoworkCalanderView from "./CoworkCalanderView";

function SpaceDetailedView({ props }) {
  const navigate = useNavigate();
  const [spaceDetails, setSpaceDetails] = useState({});
  const [loadingSpaceDetails, setLoadingSpaceDetails] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [coWorkBookDates, setCoWorkBookedDates] = useState(null);
  const [spaceId, spaceType] = props;
  console.log(spaceId, "props are getting properly");

  useEffect(() => {
    // Fetch space details
    axios
      .get(`${BaseUrl}/space/${spaceType}/${spaceId.id}/`)
      .then((response) => {
        setSpaceDetails(response.data);
        setLoadingSpaceDetails(false);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, [spaceId, spaceType]);

  useEffect(() => {
    // Fetch booked dates for the specific space

    axios
      .get(`${BaseUrl}/space/${spaceType}/${spaceId.id}/book/`)
      .then((response) => {
        if (spaceType === "cowork") {
          setCoWorkBookedDates(response.data);
        } else {
          // console.log(response);
          const bookedDatesArray = response.data.map(
            (booking) => new Date(booking.booking_date)
          );
          setBookedDates(bookedDatesArray);
        }
      })
      .catch((error) => {
        console.log("Error fetching booked dates", error);
      });
  }, [spaceId, spaceType]);

  // Add a check before opening the modal
  const handleBooking = (date) => {
    // Check if the selected date is already booked
    if (
      bookedDates.some(
        (bookedDate) => date.toDateString() === bookedDate.toDateString()
      )
    ) {
      toast.error("This date is already booked. Please select another date.");
    } else {
      const data = {
        date: selectedDate,
        spaceDetails: spaceDetails,
        BookingDate: bookedDates,
      };
      navigate("/user/spacedetails/checkout", { state: { data: data } });
    }
  };

  return (
    <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
      <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full mb-8 md:w-1/2 md:mb-0">
            <div className="sticky top-0 z-50 overflow-hidden">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                {loadingSpaceDetails ? (
                  <p>Loading...</p>
                ) : spaceDetails && spaceDetails.image ? (
                  <img
                    src={spaceDetails.image}
                    alt={spaceDetails.name}
                    className="object-cover ml-16 w-[32rem] lg:h-[32rem]"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <div className="flex-wrap hidden md:flex">
                {/* Your additional images go here */}
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-8">
                <h2 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {loadingSpaceDetails
                    ? "Loading..."
                    : (spaceDetails && spaceDetails.name) ||
                      "Space Name Not Available"}
                </h2>
                <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400">
                  <span>
                    {loadingSpaceDetails
                      ? "Loading..."
                      : `₹${spaceDetails && spaceDetails.price}`}
                  </span>
                </p>

                <p className="max-w-md text-gray-700 dark:text-gray-400 mt-4 text-2xl">
                  {loadingSpaceDetails
                    ? "Loading..."
                    : spaceType === "conference"
                    ? "Capacity : "
                    : "slots : "}
                  {loadingSpaceDetails
                    ? "Loading..."
                    : spaceType === "conference"
                    ? spaceDetails.Capacity
                    : spaceDetails.slots}
                </p>
                <p className="max-w-md text-gray-700 dark:text-gray-400 mt-5 text-2xl">
                  {loadingSpaceDetails
                    ? "Loading..."
                    : spaceDetails && spaceDetails.description}
                </p>

                {/* Displaying location data with conditional checks */}
                <p className="text-gray-600 mt-10 text-2xl">
                  Location:
                  {spaceDetails.location
                    ? (() => {
                        try {
                          const locationObject = JSON.parse(
                            spaceDetails.location
                          );
                          return `${
                            locationObject.district || "District Not Available"
                          }, ${locationObject.city || "City Not Available"}`;
                        } catch (error) {
                          console.error("Error parsing location:", error);
                          return "Invalid location data";
                        }
                      })()
                    : "Location data not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Updated Calendar Section */}
        <div className="my-8 text-center flex flex-col items-center">
          <div className="relative">
            <p className="flex justify-center max-w-md text-gray-700 dark:text-gray-400">
              Available Dates:
            </p>

            {spaceType === "conference" ? (
              <Calendar
                onChange={(date) => setSelectedDate(date)}
                value={selectedDate}
                tileClassName={({ date, view }) => {
                  const isBooked = bookedDates.some(
                    (bookedDate) =>
                      date.toDateString() === bookedDate.toDateString()
                  );
                  const isPastDate = date < new Date();

                  // Styles for booked dates
                  const bookedStyle = {
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                  };

                  // Styles for bookable date
                  const bookableStyle = {
                    background: "green",
                    color: "white",
                    borderRadius: "50%",
                  };

                  return `calendar-tile ${isBooked ? "booked" : ""} ${
                    isPastDate ? "past-date" : ""
                  }`;
                }}
                tileDisabled={({ date }) =>
                  bookedDates.some(
                    (bookedDate) =>
                      date.toDateString() === bookedDate.toDateString()
                  ) || date < new Date()
                }
              />
            ) : (
              <CoworkCalanderView
                data={coWorkBookDates}
                spaceDetails={spaceDetails}
              />
            )}
          </div>
          {/* Display selected date */}
          {spaceType === "conference"
            ? selectedDate && (
                <div className="my-4">
                  <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
                  <button
                    onClick={() => handleBooking(selectedDate)}
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    Book this date
                  </button>
                </div>
              )
            : ""}
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </section>
  );
}

export default SpaceDetailedView;
