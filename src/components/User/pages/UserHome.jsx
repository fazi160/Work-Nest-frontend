import React, { useState, useEffect } from "react";

import UserNavbar from "./homepage/UserNavbar";
import { Link } from "react-router-dom";

import banner1 from "../../../assets/banners/banner1.jpg";
import banner2 from "../../../assets/banners/banner2.jpg";
import banner3 from "../../../assets/banners/banner3.jpg";
import banner4 from "../../../assets/banners/banner4.jpg";
import SpaceView from "./homepage/SpaceView";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import PersonIcon from "@mui/icons-material/Person";
import DeskIcon from "@mui/icons-material/Desk";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ChairIcon from "@mui/icons-material/Chair";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Footer from "./homepage/Footer";
import { useNavigate } from "react-router-dom";

const bannerStyles = "w-full h-96 object-cover"; // Adjust the height here
const companyInfoStyles = "text-center py-8"; // Adjust the padding here
const buttonStyles =
  "bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-6 rounded"; // Adjust the padding and font size here

function UserHome() {
  const [currentBanner, setCurrentBanner] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically switch banners every 3 seconds
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner === 4 ? 1 : prevBanner + 1));
    }, 3000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);
  // Function to toggle the chat visibility
  const toggleChat = () => {
    navigate("user/chat");
  };
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
        <h2 className="text-6xl font-bold">Work Nest</h2>
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
        {/* <button className={buttonStyles} onClick={toggleChat}>
          Open Chat
        </button> */}
      </div>
      <br />
      <p className="flex justify-center text-4xl font-bold">Conference Halls</p>
      <SpaceView prop="conference" numNewest={3} />
      <div className="flex justify-center">
        <Link to="/user/conferencehalls">
          <button className=" bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            See more...
          </button>
        </Link>
      </div>
      <br />
      <br />
      <p className="flex justify-center text-3xl font-bold">
        Co-Working Spaces
      </p>
      <SpaceView prop="coWork" numNewest={3} />
      <div className="flex justify-center">
        <Link to="/user/coworkspaces">
          <button className=" bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            See more...
          </button>
        </Link>
      </div>

      <p className="flex justify-center text-3xl font-bold mt-10">Amenities</p>
      <p className="text-center mx-auto max-w-lg mt-2">
        All of our workspaces and memberships come with all-inclusive business
        amenities so you can work your way
      </p>

      <div className="flex flex-wrap justify-center mt-5">
        <div className="flex flex-col bg-D2D2D2 p-4 m-4 rounded-md shadow-md text-center">
          <div className="font-bold mb-2">Essentials</div>
          <WifiIcon className="mx-auto mb-2" />
          Super Fast WiFi <br />
          <LocalPrintshopIcon className="mx-auto mb-2" />
          Print / Scan / Copy <br />
          <CoffeeMakerIcon className="mx-auto mb-2" />
          Free Coffee and Tea
        </div>

        <div className="flex flex-col bg-D2D2D2 p-4 m-4 rounded-md shadow-md text-center">
          <div className="font-bold mb-2">Support</div>
          <PersonIcon className="mx-auto mb-2" />
          Office Managers <br />
          <DeskIcon className="mx-auto mb-2" />
          Hosted Reception <br />
          <CleaningServicesIcon className="mx-auto mb-2" />
          Professional Cleaning
        </div>

        <div className="flex flex-col bg-D2D2D2 p-4 m-4 rounded-md shadow-md text-center">
          <div className="font-bold mb-2">Spaces</div>
          <ChairIcon className="mx-auto mb-2" />
          Lounge & Lobby Areas <br />
          <KitchenIcon className="mx-auto mb-2" />
          Kitchen & Dining Areas <br />
          <MeetingRoomIcon className="mx-auto mb-2" />
          Private Phone Booths
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserHome;
