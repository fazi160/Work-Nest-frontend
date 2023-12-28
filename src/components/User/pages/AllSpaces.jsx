import React, { useEffect, useState } from "react";
import UserNavbar from "./homepage/UserNavbar";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../constants/constants";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "./homepage/Footer";

function AllSpaces() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState(3);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const initialOptions = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Kottayam",
    "Idukki",
    "Alappuzha",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ];

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((selectedOption) => selectedOption !== option)
        : [...prevOptions, option]
    );
  };

  useEffect(() => {
    const currentUrl = window.location.href;

    if (currentUrl.includes("conferencehalls")) {
      setType("conference");
    } else if (currentUrl.includes("coworkspaces")) {
      setType("cowork");
    } else {
      navigate("/user");
    }
  }, [navigate]);

  const typeInString = type.toString();

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `${BaseUrl}/space/${typeInString}/`;

      try {
        const response = await axios.get(apiUrl);
        setData(response.data.results);
        // Do not call sortData here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [typeInString, sortType]);

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const bookNow = (space) => {
    navigate("/user/spacedetails", { state: { space: space, type: type } });
  };

  const filteredData = data
    .filter(
      (space) =>
        selectedOptions.length === 0 ||
        selectedOptions.includes(JSON.parse(space.location).district)
    )
    .sort((a, b) => {
      switch (sortType) {
        case 1:
          return a.price - b.price;
        case 2:
          return b.price - a.price;
        case 3:
          return new Date(a.created_at) - new Date(b.created_at);
        case 4:
          return new Date(b.created_at) - new Date(a.created_at);
        case 5:
          return a.Capacity - b.Capacity;
        case 6:
          return b.Capacity - a.Capacity;
        default:
          return new Date(a.created_at) - new Date(b.created_at);
      }
    });

  return (
    <div>
      <UserNavbar />

      <div className="flex items-center justify-between py-2 w-full">
        <div className="flex justify-start text-center w-2/3">
          
          <div className="ml-2 text-3xl lg:flex items-center">
            <MenuIcon
              className="cursor-pointer text-5xl "
              onClick={() => setIsDrawerOpen(true)}
            />
            <span className="hidden lg:block text-xl lg:mr-8 xl:mr-80">
              Filter
            </span>
          </div>

          <h1 className="sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif me-1.5">
            {type === "cowork" ? "CO-WORKING SPACES" : "CONFERENCE HALLS"}
          </h1>
        </div>

        <div className="flex justify-end mr-5 w-4/12">
          <FormControl className="w-full md:w-44">
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortType}
              label="Sort By"
              onChange={handleChange}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left", // Change to left for mobile view
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left", // Change to left for mobile view
                },
                getContentAnchorEl: null,
              }}
            >
              {[
                <MenuItem key={1} value={1}>
                  Price <span className="font-bold ml-1 text-lg">▼</span>
                </MenuItem>,
                <MenuItem key={2} value={2}>
                  Price <span className="font-bold ml-1 text-lg">▲</span>
                </MenuItem>,
                <MenuItem key={3} value={3}>
                  Newest <span className="font-bold ml-1 text-lg">▼</span>
                </MenuItem>,
                <MenuItem key={4} value={4}>
                  Newest <span className="font-bold ml-1 text-lg">▲</span>
                </MenuItem>,
                ...(typeInString === "conference"
                  ? [
                      <MenuItem key={5} value={5}>
                        Hall size{" "}
                        <span className="font-bold ml-1 text-lg">▼</span>
                      </MenuItem>,
                      <MenuItem key={6} value={6}>
                        Hall size{" "}
                        <span className="font-bold ml-1 text-lg">▲</span>
                      </MenuItem>,
                    ]
                  : []),
              ]}
            </Select>
          </FormControl>
        </div>
      </div>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Filter By District</h2>
          {initialOptions.map((option) => (
            <div key={option} className="mb-2 flex items-center">
              <input
                type="checkbox"
                id={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2 h-5 w-5 transform scale-100"
              />
              <label htmlFor={option} className="text-xl ml-2">
                {option}
              </label>
            </div>
          ))}
        </div>
      </Drawer>

      <hr className="mx-auto border-t-4 border-black-500" />
      <div className="flex text-xl">
        <div className="w-full p-4 border-r-4 text-xl">
          {filteredData.map((space) => (
            <div className="flex justify-center" key={space.id}>
              <div className="w-full md:w-[30rem] lg:w-[60rem] p-4 md:p-6 lg:p-8 border rounded-lg shadow-md hover:shadow-lg bg-white hover:bg-gray-100 my-8 flex flex-col md:flex-row">
                <img
                  src={space.image}
                  alt={space.name}
                  className="w-full md:w-[25rem] lg:w-[30rem] h-[20rem] md:h-[25rem] object-cover rounded-lg mb-4 md:mr-4 md:mb-0"
                />
                <div className="flex-grow md:w-2/3">
                  <h2
                    className={`text-2xl md:text-4xl lg:text-5xl font-semibold ${
                      typeInString === "conference"
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {space.name}
                  </h2>
                  <p className="text-base md:text-lg mt-2 md:mt-4">
                    Price: ₹{space.price}
                  </p>
                  <p className="text-base md:text-lg">
                    {typeInString === "conference" ? "Capacity" : "Slots"}:{" "}
                    {typeInString === "conference"
                      ? space.Capacity
                      : space.slots}
                  </p>
                  <p className="text-base md:text-lg mt-2 md:mt-4">
                    Description: {space.description}
                  </p>

                  <p className="text-base md:text-lg mt-2 md:mt-4">
                    {space.location
                      ? (() => {
                          try {
                            const locationObject = JSON.parse(space.location);
                            return `${
                              locationObject.district ||
                              "District Not Available"
                            }, ${locationObject.city || "City Not Available"}`;
                          } catch (error) {
                            console.error("Error parsing location:", error);
                            return "Invalid location data";
                          }
                        })()
                      : "Location data not available"}
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="py-2.5 px-5 text-base md:text-lg font-medium text-gray-900 focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={() => bookNow(space)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllSpaces;
