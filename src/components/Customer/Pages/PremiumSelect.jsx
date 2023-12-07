import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl,reactUrl } from "../../../constants/constants";
import jwtDecode from "jwt-decode";
import backgroundImage from "../../../assets/premium_background.jpg";

const PremiumSelect = () => {
  const [premiumPackages, setPremiumPackages] = useState([]);
  const token = localStorage.getItem("token");
  const userData = jwtDecode(token);

  const paymentOfPremium = async (selectedPlan) => {
    try {
      // Check if a plan is selected
      if (!selectedPlan) {
        console.error("Please select a premium plan.");
        return;
      }

      var data = {
        planId: selectedPlan.id,
        userId: userData.user_id,
        name: selectedPlan.name,
        currency: "INR",
        unit_amount: selectedPlan.price * 100, // Convert to cents
        quantity: 1,
        mode: "payment",
        success_url: `${reactUrl}/customer/success=true`,
        cancel_url: `${reactUrl}/customer/canceled=true`,
        // Add any additional data you need
      };

      console.log("Complete data object:", data); // Log the complete data object

      // Make a request to your backend to initiate the Stripe payment
      const response = await axios.post(`${BaseUrl}/premium/payment/`, data);

      // Redirect to the Stripe checkout session URL
      window.location.href = response.data.message.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    localStorage.removeItem('currentPage')
    axios
      .get(`${BaseUrl}/premium/packages/`)
      .then((response) => {
        const sortedPackages = response.data.results.sort(
          (a, b) => a.price - b.price
        );
        setPremiumPackages(sortedPackages);
      })
      .catch((error) => {
        console.error("Error fetching premium packages:", error);
      });
  }, []);


  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        marginTop: "-4.5rem",
        marginLeft: "15rem",
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div
        className="w-full max-w-6xl p-8 mb-32 bg-black bg-opacity-80 rounded-md text-white"
        style={{ padding: "1rem 0rem 0rem 0rem" }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">
          Choose Your Premium Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumPackages.map((data, index) => (
            <div
              key={data.id}
              className={`p-6 rounded-md shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
                index > 0 ? 'border-l border-gray-400' : '' // Add border only if it's not the first card
              }`}
              onClick={() => paymentOfPremium(data)}
            >
              <h2 className="text-xl text-center font-bold mb-2">
                {data.name}
              </h2>
              <p className="text-sm text-center font-semibold mb-2">
                Price: ₹{data.price}
              </p>
              <p className="text-sm text-center font-semibold mb-2">
                Validity: {data.validity} days
              </p>
              <div className="p-4">
                <p className="text-sm text-center mb-2 ">{data.description}</p>
                <div className="flex items-center justify-center mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                    Select Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default PremiumSelect;
