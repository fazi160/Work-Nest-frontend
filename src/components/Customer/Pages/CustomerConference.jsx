import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import citiesData from "./locations.json";
// import { Button } from "@material-tailwind/react";
// import AddIcon from "@mui/icons-material/Add";
Modal.setAppElement("#root");
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function CustomerConference() {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;

  const [conferenceData, setConferenceData] = useState([]);
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editConferenceHall, setEditConferenceHall] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: null,
    Capacity: null,
    is_available: false,
    image: null,
    location: {}, // This should be an object
    customer: userId,
  });

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [districtCities, setDistrictCities] = useState([]);

  const districtOptions = Object.keys(citiesData.cities);

  // Update district and city in formData when they change
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      location: {
        district: selectedDistrict,
        city: selectedCity,
      },
    }));
  }, [selectedDistrict, selectedCity]);

  // Fetch conference hall data
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/space/conference-halls/${userId}/`;
    Axios.get(apiUrl)
      .then((response) => {
        setConferenceData(response.data.results);
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

    // Update the location in the formData state
    setFormData({
      ...formData,
      location: {
        district: selectedDistrict,
        city: selectedCity,
      },
    });
  };

  // Handle the creation of a new conference hall
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

  // Handle the update of an existing conference hall
  const handleEdit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("Capacity", formData.Capacity);
    formDataToSend.append("is_available", formData.is_available);
    formDataToSend.append("location", JSON.stringify(formData.location));

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    const editApiUrl = `http://127.0.0.1:8000/space/conference-halls/${userId}/${formData.id}/`;

    Axios.patch(editApiUrl, formDataToSend)
      .then((response) => {
        if (response.status === 200) {
          const updatedData = conferenceData.map((hall) =>
            hall.id === editConferenceHall.id ? response.data : hall
          );
          setConferenceData(updatedData);
          setEditModalOpen(false);
        } else {
          console.error("Edit operation was not successful:", response);
        }
      })
      .catch((error) => {
        console.error("Error updating the conference hall:", error);
      });
  };

  // Handle the deletion of a conference hall
  const handleDelete = (conferenceHallId) => {
    Axios.delete(
      `http://127.0.0.1:8000/space/conference-halls/${userId}/${conferenceHallId}/`
    )
      .then(() => {
        const updatedData = conferenceData.filter(
          (hall) => hall.id !== conferenceHallId
        );
        setConferenceData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting the conference hall:", error);
      });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
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
          <td>
            {JSON.parse(hall.location).district}, {JSON.parse(hall.location).city}
          </td>
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
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && (
            <div>
              <img
                src={
                  typeof formData.image === "string"
                    ? formData.image
                    : URL.createObjectURL(formData.image)
                }
                alt="Current Image"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
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
