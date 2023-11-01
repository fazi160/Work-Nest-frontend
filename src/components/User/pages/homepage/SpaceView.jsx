import axios from "axios";
import React, { useEffect, useState } from "react";

// to show the data's for conference and coWorking space
function SpaceCard({ data, category }) {
  return (
<div className="flex justify-center">
  <div className="w-192 p-8 border rounded-lg shadow-md hover:shadow-lg bg-white hover:bg-gray-100 my-8 flex">
    <img
      src={data.image}
      alt={data.name}
      className="w-48 h-48 object-cover rounded-lg mr-4"
    />
    <div className="w-96">
      <h2 className={`text-4xl font-semibold ${
        category === "conference" ? "text-indigo-700" : "text-green-700"
      }`}>
        {data.name}
      </h2>
      <p className="text-gray-600 mt-4">Price: ${data.price}</p>
      <p className="text-gray-600">
        {category === "conference" ? "Capacity" : "Slots"}:{" "}
        {category === "conference" ? data.Capacity : data.slots}
      </p>
      <p className="text-gray-600 mt-4">Description: {data.description}</p>
      <p className="text-gray-600 mt-4">
        Location: {JSON.parse(data.location).district},{" "}
        {JSON.parse(data.location).city}
      </p>
      <p className="text-gray-600 mt-4">
        Available: {data.is_available ? "Yes" : "No"}
      </p>
    </div>
  </div>
</div>





  );
}

function SpaceView({ prop, numNewest }) {
  const [data, setData] = useState([]);
  const category = prop === "coWork" ? "cowork" : "conference";

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/space/${category}/`;
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
    <div >
      {data.map((item) => (
        <SpaceCard key={item.id} data={item} category={category} />
      ))}
    </div>
  );
}

export default SpaceView;
