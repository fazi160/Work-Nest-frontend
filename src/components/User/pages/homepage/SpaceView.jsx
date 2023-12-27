import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../../../constants/constants";
import { useNavigate } from "react-router-dom";

function SpaceCard({ data, category }) {
  const navigate = useNavigate();
  const bookNow = (space) => {
    console.log(space, category, "bokokokokokokokokokkokokokokokokokokokokok");
    navigate("/user/spacedetails", { state: { space: space, type: category } });
  };
  return (
    <div className="flex justify-center mb-8">
      <div className="w-[55rem] p-8 border rounded-lg shadow-md hover:shadow-lg bg-white hover:bg-gray-100 my-8 flex">
        <img
          src={data.image}
          alt={data.name}
          className="w-[25rem] h-[25rem] object-cover rounded-lg mr-4"
        />
        <div className="w-2/3">
          <h2
            className={`text-5xl font-semibold ${
              category === "conference" ? "text-black" : "text-black"
            }`}
          >
            {data.name}
          </h2>
          <p className="text-lg mt-4">Price: ₹{data.price}</p>
          <p className="text-lg">
            {category === "conference" ? "Capacity" : "Slots"}:{" "}
            {category === "conference" ? data.Capacity : data.slots}
          </p>
          <p className="text-lg mt-4">Description: {data.description}</p>

          <p className="text-lg mt-4">
            {data.location
              ? (() => {
                  try {
                    const locationObject = JSON.parse(data.location);
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
          <div className="px-20 mt-10">
            <button
              type="button"
              class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => bookNow(data)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpaceView({ prop, numNewest }) {
  const [data, setData] = useState([]);
  const category = prop === "coWork" ? "cowork" : "conference";

  useEffect(() => {
    const apiUrl = `${BaseUrl}/space/${category}/`;
    console.log(apiUrl);

    axios.get(apiUrl).then((response) => {
      console.log(response.data, "data from backend");
      const sortedData = response.data.results.sort((a, b) => b.id - a.id);
      if (numNewest > 0) {
        const newestData = sortedData.slice(0, numNewest);
        setData(newestData);
      } else {
        setData(sortedData);
      }
    });
  }, [category, numNewest]);

  return (
    <div>
      {data.map((item) => (
        <SpaceCard key={item.id} data={item} category={category} />
      ))}
    </div>
  );
}

export default SpaceView;
