import React, { useState, useEffect } from "react";

import UserNavbar from "./homepage/UserNavbar";

import banner1 from "../../../assets/banners/banner1.jpg";
import banner2 from "../../../assets/banners/banner2.jpg";
import banner3 from "../../../assets/banners/banner3.jpg";
import banner4 from "../../../assets/banners/banner4.jpg";
import SpaceView from "./homepage/SpaceView";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import PersonIcon from '@mui/icons-material/Person';
import DeskIcon from '@mui/icons-material/Desk';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ChairIcon from '@mui/icons-material/Chair';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Footer from "./homepage/Footer";

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
    <>
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
        <h2 className="text-5xl font-bold">Work Nest</h2>
        <br />
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
      <br />
      <p className="flex justify-center text-3xl font-bold">Conference Halls</p>
      <SpaceView prop="conference" numNewest={0} />
      <div className="flex justify-center">
        <button className=" bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
          See more...
        </button>
      </div>
      <br />
      <br />
      <p className="flex justify-center text-3xl font-bold">
        Co-Working Spaces
      </p>
      <SpaceView prop="coWork" numNewest={0} />
      <div className="flex justify-center">
        <button className=" bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
          See more...
        </button>
      </div>
      <br />
      <br />
      <br />
      <p className="flex justify-center text-3xl font-bold">Amenities</p>
      <p className="text-lg-center mx-auto max-w-lg">
        All of our workspaces and memberships come with all-inclusive business
        amenities so you can work your way
      </p>
      <br />
      <div className="flex justify-center">
        <div className="bg-D2D2D2 p-4 m-4 rounded-md shadow-md">
          <div className="flex justify-center items-center">
            <p className="font-bold">Essentials</p>
          </div>
          <WifiIcon className="mr-2"/>
          Super Fast WiFi <br />
          <br />
          <LocalPrintshopIcon className="mr-2"/>
          Print / Scan / Copy <br />
          <br />
          <CoffeeMakerIcon className="mr-2" />
          Free Coffee and Tea <br />
          <br />
        </div>


        <div className="bg-D2D2D2 p-4 m-4 rounded-md shadow-md">
          <div className="flex justify-center items-center">
            <p className="font-bold">Support</p>
          </div>
          <PersonIcon className="mr-2"/>
          Office Managers <br />
          <br />
          <DeskIcon className="mr-2"/>
          Hosted Reception <br />
          <br />
          <CleaningServicesIcon className="mr-2"/>
          Professional Cleaning <br />
          <br />
        </div>


        <div className="bg-D2D2D2 p-4 m-4 rounded-md shadow-md">
          <div className="flex justify-center items-center">
            <p className="font-bold">Spaces</p>
          </div>
          <ChairIcon className="mr-2"/>
          Lounge & Lobby Areas <br />
          <br />
          <KitchenIcon className="mr-2"/>
          Kitchen & Dining Areas <br />
          <br />
          <MeetingRoomIcon className="mr-2"/>
          Private Phone Booths <br />
          <br />
        </div>
        <br />
      </div>
      <Footer/>
    </>
  );
}

export default UserHome;
