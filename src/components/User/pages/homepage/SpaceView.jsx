import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../../../constants/constants";

// to show the data's for conference and coWorking space


// ... (existing code)

function SpaceCard({ data, category }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="w-[55rem] p-8 border rounded-lg shadow-md hover:shadow-lg bg-white hover:bg-gray-100 my-8 flex">
        <img
          src={data.image}
          alt={data.name}
          className="w-[25rem] h-[25rem] object-cover rounded-lg mr-4"
        />
        <div className="w-2/3">
          <h2 className={`text-5xl font-semibold ${
            category === "conference" ? "text-black" : "text-black"
          }`}>
            {data.name}
          </h2>
          <p className="text-lg mt-4">Price: ₹{data.price}</p>
          <p className="text-lg">
            {category === "conference" ? "Capacity" : "Slots"}:{" "}
            {category === "conference" ? data.Capacity : data.slots}
          </p>
          <p className="text-lg mt-4">Description: {data.description}</p>
          <p className="text-lg mt-4">
            Location: {JSON.parse(data.location).district},{" "}
            {JSON.parse(data.location).city}
          </p>
          <p className="text-lg mt-4">
            Available: {data.is_available ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}


// ... (existing code)








function SpaceView({ prop, numNewest }) {
  const [data, setData] = useState([]);
  const category = prop === "coWork" ? "cowork" : "conference";

  useEffect(() => {
    const apiUrl = `${BaseUrl}/space/${category}/`;
    axios.get(apiUrl).then((response) => {
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
