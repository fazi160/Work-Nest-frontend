import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import citiesData from "./locations.json";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

Modal.setAppElement("#root");

function CustomerConference() {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;

  const [conferenceData, setConferenceData] = useState([]);
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editConferenceHall, setEditConferenceHall] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: null,
    Capacity: null,
    is_available: false,
    image: null,
    location: {
      district: "",
      city: "",
    },
    customer: userId,
  });

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [districtCities, setDistrictCities] = useState([]);

  const [imageURL, setImageURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "the image file");
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  useEffect(() => {
    if (editConferenceHall && editConferenceHall.image) {
      setImageURL(editConferenceHall.image);
    }
  }, [editConferenceHall]);

  const districtOptions = Object.keys(citiesData.cities);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      location: {
        district: selectedDistrict,
        city: selectedCity,
      },
    }));
  }, [selectedDistrict, selectedCity]);

  function cleanLocation(data) {
    return data.map((item) => {
      let cleanedLocation;
      try {
        const location = JSON.parse(item.location.replace(/\\"/g, '"'));
        cleanedLocation = {
          district: location.district || "",
          city: location.city || "",
        };
        console.log("Parsed Location:", cleanedLocation);
      } catch (error) {
        console.error("Location Parsing Error:", error);
        cleanedLocation = { district: "", city: "" };
      }
      return {
        ...item,
        location: cleanedLocation,
      };
    });
  }

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/space/conference-halls/${userId}/`;
    Axios.get(apiUrl)
      .then((response) => {
        const modifiedData = cleanLocation(response.data.results);
        setConferenceData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);

    const cities = citiesData.cities[selectedDistrict];
    setDistrictCities(cities);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);

    setFormData({
      ...formData,
      location: {
        district: selectedDistrict,
        city: selectedCity,
      },
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `http://127.0.0.1:8000/space/conference-halls/${userId}/`;

      const spaceData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        Capacity: formData.Capacity,
        is_available: formData.is_available,
        location: formData.location,
        customer: userId,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("name", spaceData.name);
      formDataToSend.append("description", spaceData.description);
      formDataToSend.append("price", spaceData.price);
      formDataToSend.append("Capacity", spaceData.Capacity);
      formDataToSend.append("is_available", spaceData.is_available);
      formDataToSend.append("customer", spaceData.customer);
      formDataToSend.append("location", JSON.stringify(spaceData.location));

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await Axios.post(apiUrl, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        const data = response.data;
        setConferenceData((prevData) => [...prevData, data]);
        setNewModalOpen(false);
      } else {
        console.error("Failed to create a new space");
      }
    } catch (error) {
      console.error("Error creating a new space:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `http://127.0.0.1:8000/space/conference-halls/${userId}/${formData.id}/`;

      // Fetch the old data, including the image URL
      const oldData = await axios.get(apiUrl);

      // Extract the image URL from the old data
      const imageUrl = oldData.data.image;
      console.log(imageUrl, "before");

      const oldImage = extractFileNameFromURL(imageUrl);

      // Construct a new File object with the old image name and the "image/jpeg" type
      const finalImage = new File([oldImage], "image.jpeg", {
        type: "image/jpeg",
      });
      console.log(finalImage, "final url");
      console.log(formData.location, "location");
      const spaceData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        Capacity: formData.Capacity,
        is_available: formData.is_available,
        location: formData.location,
        customer: userId,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("name", spaceData.name);
      formDataToSend.append("description", spaceData.description);
      formDataToSend.append("price", spaceData.price);
      formDataToSend.append("Capacity", spaceData.Capacity);
      formDataToSend.append("is_available", spaceData.is_available);
      formDataToSend.append("customer", spaceData.customer);
      formDataToSend.append("location", JSON.stringify(spaceData.location));

      // Check if a new image is selected, if not, use the old image URL
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      } else {
        // If there's no new image selected, use the new File object
        // formDataToSend.append("image", finalImage);
      }

      let stat = spaceData;

      if (formData.image) {
        stat = formDataToSend;
      }

      
      const response = await axios.patch(apiUrl, stat, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const updatedData = conferenceData.map((hall) =>
          hall.id === formData.id ? response.data : hall
        );
        setConferenceData(updatedData);
        setEditModalOpen(false);
      } else {
        console.error("Edit operation was not successful:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("Request failed with status code", error.response.status);
        console.error("Response data:", error.response.data);
      } else {
        console.error("Error updating the conference hall:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const apiUrl = `http://127.0.0.1:8000/space/conference-halls/${userId}/${id}/`;
      const response = await Axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        const updatedData = conferenceData.filter((hall) => hall.id !== id);
        setConferenceData(updatedData);
      } else {
        console.error("Delete operation was not successful:", response);
      }
    } catch (error) {
      console.error("Error deleting the conference hall:", error);
    }
  };

  const extractFileNameFromURL = (url) => {
    return url.split("/").pop();
  };

  console.log(conferenceData);

  return (
    <div className="p-4" style={{ marginLeft: "15rem" }}>
      <div style={{ marginLeft: "62rem" }}>
        <Button
          className="bg-black"
          onClick={() => setNewModalOpen(true)}
          style={{ width: "15rem" }}
        >
          <AddIcon style={{ fontSize: 32 }} />
          Create Conference Hall
        </Button>
      </div>
      <br />

      {conferenceData.map((hall) => (
        <div
          key={hall.id}
          className="flex rounded-lg bg-white shadow-md p-2 mb-4"
        >
          <img
            className="h-48 w-48 rounded-l-lg object-cover"
            src={hall.image}
            alt={hall.name}
          />

          <div className="flex flex-col justify-start p-2">
            <h5 className="text-lg font-medium text-black dark:text-black">
              {hall.name}
            </h5>
            <table className="w-full">
              <tr>
                <td className="pr-2">Capacity:</td>
                <td>{hall.Capacity}</td>
              </tr>
              <tr>
                <td className="pr-2">Customer:</td>
                <td>{hall.customer}</td>
              </tr>
              <tr>
                <td className="pr-2">Description:</td>
                <td>{hall.description}</td>
              </tr>
              <tr>
                <td className="pr-2">Price:</td>
                <td>₹{hall.price}</td>
              </tr>
              <tr>
                <td className="pr-2">Location:</td>
                {hall.location.district},{hall.location.city}
              </tr>
              <tr>
                <td className="pr-2">Availability:</td>
                <td>{hall.is_available ? "Available" : "Not Available"}</td>
              </tr>
            </table>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setEditConferenceHall(hall);
                  setFormData(hall);
                  setEditModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(hall.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isNewModalOpen}
        onRequestClose={() => setNewModalOpen(false)}
      >
        <h2>Create Conference Hall</h2>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <TextField
            label="Capacity"
            variant="outlined"
            fullWidth
            value={formData.Capacity}
            onChange={(e) =>
              setFormData({ ...formData, Capacity: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                name="is_available"
                checked={formData.is_available}
                onChange={(e) =>
                  setFormData({ ...formData, is_available: e.target.checked })
                }
              />
            }
            label="Is Available"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* Select District and City */}
          <Select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            fullWidth
          >
            <MenuItem value="">
              <em>Select District</em>
            </MenuItem>
            {districtOptions.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
          {selectedDistrict && (
            <div>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Select City</em>
                </MenuItem>
                {districtCities.map((city, index) => (
                  <MenuItem key={index} value={city.City}>
                    {city.City}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        </form>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        style={{
          content: {
            width: "400px", // Adjust the width
            height: "500px", // Adjust the height
            margin: "auto", // Center the modal horizontally
          },
          overlay: {
            zIndex: 1001,
          },
        }}
      >
        <h2>Edit Conference Hall</h2>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <TextField
            label="Capacity"
            variant="outlined"
            fullWidth
            value={formData.Capacity}
            onChange={(e) =>
              setFormData({ ...formData, Capacity: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                name="is_available"
                checked={formData.is_available}
                onChange={(e) =>
                  setFormData({ ...formData, is_available: e.target.checked })
                }
              />
            }
            label="Is Available"
          />

          <div className="form-field">
            <label>Image:</label>
            <input type="file" name="image" onChange={handleImageChange} />
            {formData.image ? (
              <div className="form-field">
                <label>Current Image:</label>
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image // Use the URL directly if it's a string (e.g., the existing image URL)
                      : URL.createObjectURL(formData.image) // Create an object URL if it's a Blob or File
                  }
                  alt="Current Image"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            ) : (
              <div className="form-field">
                <label>Current Image:</label>
                <img
                  src={imageURL}
                  alt="Current Image"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}
          </div>

          <Select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            fullWidth
          >
            <MenuItem value="">
              <em>Select District</em>
            </MenuItem>
            {districtOptions.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
          {selectedDistrict && (
            <div>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Select City</em>
                </MenuItem>
                {districtCities.map((city, index) => (
                  <MenuItem key={index} value={city.City}>
                    {city.City}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Update
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default CustomerConference;
