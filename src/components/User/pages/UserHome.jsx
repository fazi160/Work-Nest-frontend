import React, { useState, useEffect } from "react";

import UserNavbar from "./homepage/UserNavbar";

import banner1 from "../../../assets/banners/banner1.jpg";
import banner2 from "../../../assets/banners/banner2.jpg";
import banner3 from "../../../assets/banners/banner3.jpg";
import banner4 from "../../../assets/banners/banner4.jpg";
import SpaceView from "./homepage/SpaceView";

const bannerStyles = "w-full h-96 object-cover"; // Adjust the height here
const companyInfoStyles = "text-center py-5";

function UserHome() {
  const [currentBanner, setCurrentBanner] = useState(1);

  useEffect(() => {
    // Automatically switch banners every 3 seconds
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner === 4 ? 1 : prevBanner + 1));
    }, 3000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="mt-1">
        <img
          src={
            currentBanner === 1
              ? banner1
              : currentBanner === 2
              ? banner2
              : currentBanner === 3
              ? banner3
              : banner4
          }
          alt="Banner"
          className={bannerStyles}
        />
      </div>
      <div className={companyInfoStyles}>
        <h2 className="text-3xl font-bold">Work Nest</h2>
        <p className="text-lg mx-auto max-w-lg">
          Situated across prime locations throughout India, Work Nest offers
          contemporary, fully furnished offices, versatile meeting rooms, and a
          range of flexible workspace options. Our comprehensive amenities,
          including high-speed Wi-Fi, state-of-the-art printers, dedicated
          office managers, and more, ensure your business thrives in every
          corner of the country. Join us nationwide and elevate your workspace
          experience with Work Nest.
        </p>
        <br />
        <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
          Contact Us
        </button>
      </div>
      <SpaceView/>
    </div>
  );
}

export default UserHome;
