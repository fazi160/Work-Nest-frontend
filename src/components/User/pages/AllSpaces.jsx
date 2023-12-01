import React, { useEffect, useState } from "react";
import UserNavbar from "./homepage/UserNavbar";
// import SpaceView from "./homepage/SpaceView";
import { useNavigate, Link } from "react-router-dom";
// import {SpaceCard, SpaceView} from "./homepage/SpaceView";
import { User_url } from "../../../constants/constants";
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

  useEffect(() => {
    const currentUrl = window.location.href;

    if (currentUrl.includes("conferencehalls")) {
      setType("conference");
    } else if (currentUrl.includes("coworkspaces")) {
      setType("cowork");
    } else {
      navigate("/user");
    }
  }, []);

  const typeInString = type.toString();

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `${User_url}/space/${typeInString}/`;

      try {
        const response = await axios.get(apiUrl);
        setData(response.data.results);
        console.log(response.data.results, "befookeofsdjfakj");
        sortData(response.data.results); // Pass the updated data to sortData
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [typeInString, sortType]);

  const sortData = (updatedData) => {
    // Create a copy of the data to avoid mutating the original state
    const sortedData = [...updatedData];

    switch (sortType) {
      case 1: // Price ↓
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 2: // Price ↑
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case 3: // Newest ↓
        sortedData.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      case 4: // Newest ↑
        sortedData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case 5: // Hall size ↓
        sortedData.sort((a, b) => a.Capacity - b.Capacity);
        break;
      case 6: // Hall size ↑
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
    // sortData(); // Call the sortData function when the dropdown value changes
  };

  useEffect(() => {
    // Call sortData whenever sortType changes
    sortData(data);
  }, [sortType, data]);

  const bookNow = (space) => {
    navigate('/user/spacedetails', {state:{space:space, type:type}})
  };

  return (
    <div>
      <UserNavbar />

      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold mb-4">
          {type === "cowork" ? "CO-WORKING SPACES" : "CONFERENCE HALLS"}
        </h1>
      </div>

      {/* dropdown */}
      <div className="flex justify-end mr-5">
        <FormControl className="w-48">
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
      </div>

      <hr className="mx-auto border-t-4 border-black-500" />
      <div className="flex">
        <div className="w-1/7 p-4 border-r-4">
          <h2 className="text-lg font-bold mb-4">Filtering Options</h2>

          <div className="mb-2">Filter 1</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
          <div className="mb-2">Filter 2</div>
        </div>

        <div className="w-5/6 p-4">
          {data.map((data) => (
            <div className="flex justify-center" key={data.id}>
              <div className="w-1/2 p-8 border rounded-lg shadow-md hover:shadow-lg bg-white hover:bg-gray-100 my-8 flex">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-48 h-48 object-cover rounded-lg mr-4"
                />
                <div className="w-96">
                  <h2
                    className={`text-4xl font-semibold ${
                      typeInString === "conference"
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {data.name}
                  </h2>
                  <p className="text-gray-600 mt-4">Price: ${data.price}</p>
                  <p className="text-gray-600">
                    {typeInString === "conference" ? "Capacity" : "Slots"}:{" "}
                    {typeInString === "conference" ? data.Capacity : data.slots}
                  </p>
                  <p className="text-gray-600 mt-4">
                    Description: {data.description}
                  </p>
                  <p className="text-gray-600 mt-4">
                    Location: {JSON.parse(data.location).district},{" "}
                    {JSON.parse(data.location).city}
                  </p>
                  <p className="text-gray-600 mt-4">
                    Available: {data.is_available ? "Yes" : "No"}
                  </p>
                  
                  <button onClick={() => bookNow(data.id)}>Book Now</button>

                  
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
