import jwtDecode from "jwt-decode";
import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { User_url } from "../../../constants/constants";

function Checkout() {
  const location = useLocation();

  // Access the state from the location object
  const { state } = location;

  // Check if state contains data
  if (!state || !state.data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            No data available for checkout.
          </h2>
        </div>
      </div>
    );
  }

  const { date, spaceDetails, BookingDate } = state.data;

  // Format the date as "day/month/year"
  const formattedDate = date.toLocaleDateString("en-GB");

  const paymentOfSpace = async () => {
    try {
      // Check if a plan is selected
      if (!spaceDetails) {
        console.error("Please select a premium plan.");
        return;
      }

      // Get userId from local storage
      const userId = localStorage.getItem("token");
      const decode = jwtDecode(userId);

      var data = {
        planId: spaceDetails.id,
        userId: decode.user_id,
        name: spaceDetails.name,
        currency: "INR",
        unit_amount: spaceDetails.price * 100, // Convert to cents
        quantity: 1,
        mode: "payment",
        date: formattedDate,
      };

      console.log("Complete data object:", data);

      // Make a request to your backend to initiate the Stripe payment
      const response = await axios.post(
        `${User_url}/space/booking/payment/`,
        data
      );

      // Redirect to the Stripe checkout session URL
      window.location.href = response.data.message.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <h2 className="text-3xl font-bold mb-6">Please Check Your Order</h2>
        <p className="text-lg mb-4">Date: {formattedDate}</p>
        <p className="text-lg mb-4">Space Name: {spaceDetails.name}</p>
        <p className="text-lg mb-4">Space Price: ₹{spaceDetails.price}</p>
        <p className="text-lg mb-4">
          Location:{" "}
          {spaceDetails.location
            ? (() => {
                try {
                  const locationObject = JSON.parse(spaceDetails.location);
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
        {/* Display other relevant data */}
        <button
          onClick={() => paymentOfSpace()}
          className="flex items-center justify-center mt-6 bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 text-xl"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Checkout;
