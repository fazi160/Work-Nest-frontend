import React, { useState } from "react";

function FilterOptions() {

  const initialOptions = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Kottayam",
    "Alappuzha",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
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

  return (
    <div className="w-1/7 p-4 border-r-4">
      <h2 className="text-lg font-bold mb-4">Filtering Options</h2>

      {initialOptions.map((option) => (
        <div key={option} className="mb-2">
          <input
            type="checkbox"
            id={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
            className="mr-2"
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Selected Options:</h3>
        {selectedOptions.map((selectedOption) => (
          <div key={selectedOption}>{selectedOption}</div>
        ))}
      </div>
    </div>
  );
}

export default FilterOptions;
