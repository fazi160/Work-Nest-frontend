import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { User_url } from "../../../constants/constants";
import bannerImage from "../../../assets/PremiumTimeLeft.jpg";
import { useCustomerData } from "../../../context/ContextCustomer";
function CustomerDashboard({ user_id }) {
  const customerData = useCustomerData();

  const [counts, setCounts] = useState(null);
  const [conferenceHallSales, setConferenceHallSales] = useState(null);
  const [coWorkSales, setCoWorkSales] = useState(null);
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    const baseUrl = `${User_url}/dashboard/customer/`;

    axios
      .get(`${baseUrl}counts/${user_id}/`)
      .then((response) => {
        setCounts(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });

    axios
      .get(`${baseUrl}conference/${user_id}/`)
      .then((response) => {
        setConferenceHallSales(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching conference data:", error);
      });

    axios
      .get(`${baseUrl}cowork/${user_id}/`)
      .then((response) => {
        setCoWorkSales(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching co-work data:", error);
      });
  }, [user_id]);

  useEffect(() => {
    if (customerData && customerData.premium_customer_data) {
      const calculateCountdown = () => {
        const expDate = new Date(customerData.premium_customer_data.exp_date);
        const currentDate = new Date();

        // Calculate time difference in milliseconds
        const timeDiff = expDate - currentDate;

        // Convert milliseconds to days, hours, minutes, and seconds
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      };

      // Calculate initial countdown
      calculateCountdown();

      // Set up an interval to update countdown every second
      const intervalId = setInterval(calculateCountdown, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [customerData]);

  // Chart data and options for Conference Sales
  const conferenceChartOptions = {
    chart: {
      id: "conference-chart",
    },
    xaxis: {
      categories: conferenceHallSales
        ? conferenceHallSales.map((data) => data.created_date)
        : [],
    },
  };

  const conferenceChartSeries = [
    {
      name: "Conference Sales",
      data: conferenceHallSales
        ? conferenceHallSales.map((data) => data.total_sales)
        : [],
    },
  ];

  // Chart data and options for Co-work Sales
  const coworkChartOptions = {
    chart: {
      id: "cowork-chart",
    },
    xaxis: {
      categories: coWorkSales
        ? coWorkSales.map((data) => data.created_date)
        : [],
    },
  };

  const coworkChartSeries = [
    {
      name: "Co-work Sales",
      data: coWorkSales ? coWorkSales.map((data) => data.total_sales) : [],
    },
  ];

  return (
    <div>
      {/* Banner with the image */}
      {countdown && (
        <div
          className="relative flex justify-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            height: "200px",
          }}
        >
          {/* Display countdown over the banner image */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-2xl">
            <div className="mb-16 text-2xl">Subscription Ends In:</div>
            <div className="absolute flex items-center justify-center mt-16">
              {countdown.days} days, {countdown.hours} hours,{" "}
              {countdown.minutes} minutes, {countdown.seconds} seconds
            </div>
          </div>

          {/* You can add additional content here if needed */}
        </div>
      )}
      <br />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">Total Conference Halls</h2>
            <p>
              Total:{" "}
              {counts && counts.data && counts.data.length > 0
                ? counts.data[0]
                : "N/A"}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">Total Co-work Spaces</h2>
            <p>
              Total:{" "}
              {counts && counts.data && counts.data.length > 0
                ? counts.data[1]
                : "N/A"}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">
              Total Conference Halls Bookings
            </h2>
            <p>
              Total:{" "}
              {counts && counts.data && counts.data.length > 0
                ? counts.data[2]
                : "N/A"}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">
              Total Co-work Spaces Bookings
            </h2>
            <p>
              Total:{" "}
              {counts && counts.data && counts.data.length > 0
                ? counts.data[3]
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            Conference Sales Chart (Daily)
          </h2>
          <Chart
            options={conferenceChartOptions}
            series={conferenceChartSeries}
            type="bar"
            width="100%"
          />
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Co-work Sales Chart (Daily)</h2>
          <Chart
            options={coworkChartOptions}
            series={coworkChartSeries}
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
