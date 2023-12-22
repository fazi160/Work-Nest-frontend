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

function AllSpaces() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState(3);
  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const sortData = (updatedData) => {
    const sortedData = [...updatedData];

    switch (sortType) {
      case 1:
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 2:
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case 3:
        sortedData.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      case 4:
        sortedData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case 5:
        sortedData.sort((a, b) => a.Capacity - b.Capacity);
        break;
      case 6:
        sortedData.sort((a, b) => b.Capacity - a.Capacity);
        break;
      default:
        sortedData.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
    }

    setData(sortedData);
  };

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const bookNow = (space) => {
    navigate("/user/spacedetails", { state: { space: space, type: type } });
  };

  const filteredData = data.filter((space) => {
    if (
      selectedOptions.length === 0 ||
      selectedOptions.includes(JSON.parse(space.location).district)
    ) {
      return true; // Include the space if no options are selected or if the district is selected
    } else {
      return false; // Exclude the space if options are selected and the district is not in the selectedOptions
    }
  });

  return (
    <div>
      <UserNavbar />

<div className="flex items-center justify-center py-2 w-full">

  
      <div className="flex justify-end text-center w-2/3">
        <h1 className="text-4xl font-bold font-serif">
          {type === "cowork" ? "CO-WORKING SPACES" : "CONFERENCE HALLS"}
        </h1>
      </div>

      <div className="flex justify-end mr-5 w-1/3">
        <FormControl className="w-44">
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
                horizontal: "right",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right",
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
      
      </div></div>

      <hr className="mx-auto border-t-4 border-black-500" />
      <div className="flex text-xl">
        <div className="w-7/7 p-4 border-r-4 text-xl">
          <h2 className="text-xl font-bold mb-4">Filter By District</h2>

          {initialOptions.map((option) => (
            <div key={option} className="mb-2 flex items-center">
              <input
                type="checkbox"
                id={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2 h-5 w-5 transform scale-100" // Adjusted height, width, and scale
              />
              <label htmlFor={option} className="text-xl ml-2">
                {option}
              </label>
            </div>
          ))}
        </div>

        <div className="w-5/6 p-4">
          {filteredData.map((space) => (
            <div className="flex justify-center" key={space.id}>
              <div className="w-[55rem] p-8 border rounded-lg shadow-md hover:shadow-lg bg-white hover:bg-gray-100 my-8 flex">
                <img
                  src={space.image}
                  alt={space.name}
                  className="w-[25rem] h-[25rem] object-cover rounded-lg mr-4"
                />
                <div className="w-96">
                  <h2
                    className={`text-4xl font-semibold ${
                      typeInString === "conference"
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {space.name}
                  </h2>
                  <p className="text-gray-600 mt-4">Price: ₹ {space.price}</p>
                  <p className="text-gray-600">
                    {typeInString === "conference" ? "Capacity" : "Slots"}:{" "}
                    {typeInString === "conference"
                      ? space.Capacity
                      : space.slots}
                  </p>
                  <p className="text-gray-600 mt-4">
                    Description: {space.description}
                  </p>

                  <p className="text-gray-600 mt-4">
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
                  <p className="text-gray-600 mt-4">
                    Available: {space.is_available ? "Yes" : "No"}
                  </p>
                  <div className="px-20 mt-4">
                    <button
                      type="button"
                      class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
    </div>
  );
}

export default AllSpaces;
