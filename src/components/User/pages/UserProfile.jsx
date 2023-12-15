import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Email, Phone, Person, Edit, Save, Add } from "@mui/icons-material";
import UserPurchaseReport from "./UserPurchaseReport";
import { BaseUrl } from "../../../constants/constants";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [showAddButton, setShowAddButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/auth/user/details/${decode.user_id}/`
        );
        if (response.data.results.length > 0) {
          setUserData(response.data.results[0]); // Assuming results is an array
          setShowAddButton(false);
        } else {
          setShowAddButton(true);
        }
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching user data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decode.user_id]);

  const handleEditClick = () => {
    setEditing(true);
    setUpdatedData({
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      occupation: userData?.occupation || "",
      contact: userData?.contact || "",
    });
  };

  const handleSaveClick = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmSave = () => {
    const apiUrl = editing
      ? `${BaseUrl}/auth/user/details/${userData.id}/`
      : `${BaseUrl}/auth/user/userdata/create/`;

    const method = editing ? "patch" : "post";

    axios[method](apiUrl, updatedData)
      .then((response) => {
        setUserData(response.data.results[0]); // Assuming results is an array
        setEditing(false);
        setShowAddButton(false);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while saving user data.");
      })
      .finally(() => {
        setOpenConfirmation(false);
      });
  };

  const handleAddClick = () => {
    // Logic to handle adding user data
    const defaultData = {
      user: decode.user_id,
      first_name: "",
      last_name: "",
      occupation: "",
      contact: "",
    };

    axios
      .post(`${BaseUrl}/auth/user/userdata/create/`, defaultData)
      .then((response) => {
        setUserData(response.data.results[0]); // Assuming results is an array
        setShowAddButton(false);
        setEditing(true);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while adding user data.");
      });
  };

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <Card className="max-w-md mx-auto mt-8 p-4 shadow-lg">
        <CardContent>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : error ? (
            <>
              <Typography variant="h6" color="error">
                {error}
              </Typography>
              <Button
                onClick={handleCloseError}
                color="primary"
                variant="contained"
                className="mt-4"
              >
                Retry
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <Avatar
                  alt="Profile Image"
                  src={userData?.user_main?.profile_image}
                />
                <Typography variant="h5" className="ml-4">
                  {userData ? (
                    <>
                      {userData.first_name} {userData.last_name}
                    </>
                  ) : (
                    <span className="text-red-500">
                      Please update your personal data
                    </span>
                  )}
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {userData && (
                  <>
                    {editing ? (
                      <>
                        <TextField
                          label="Occupation"
                          variant="outlined"
                          fullWidth
                          className="mb-2"
                          name="occupation"
                          value={updatedData.occupation}
                          onChange={handleChange}
                        />
                        <TextField
                          label="Contact"
                          variant="outlined"
                          fullWidth
                          className="mb-2"
                          name="contact"
                          value={updatedData.contact}
                          onChange={handleChange}
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <Typography variant="subtitle1" className="mb-2">
                            <Person fontSize="small" className="mr-2" />
                            Occupation:
                          </Typography>
                          <Typography variant="body1">
                            {userData?.occupation}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1" className="mb-2">
                            <Phone fontSize="small" className="mr-2" />
                            Contact:
                          </Typography>
                          <Typography variant="body1">
                            {userData?.contact}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1" className="mb-2">
                            <Email fontSize="small" className="mr-2" />
                            Email:
                          </Typography>
                          <Typography variant="body1">
                            {userData?.user_main?.email}
                          </Typography>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              {showAddButton && (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddClick}
                  className="mt-4"
                >
                  Add Personal Data
                </Button>
              )}
              {userData && (
                <div className="mt-4">
                  {editing ? (
                    <>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSaveClick}
                        endIcon={<Save />}
                      >
                        Save
                      </Button>
                      <Dialog
                        open={openConfirmation}
                        onClose={() => setOpenConfirmation(false)}
                      >
                        <DialogTitle>Confirm Save</DialogTitle>
                        <DialogContent>
                          <Typography variant="body1">
                            Are you sure you want to save the changes?
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => setOpenConfirmation(false)}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleConfirmSave}
                            color="primary"
                            variant="contained"
                          >
                            Confirm Save
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  ) : (
                    <IconButton color="primary" onClick={handleEditClick}>
                      <Edit />
                    </IconButton>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="fixed bottom-16 left-0 w-full bg-white p-4">
        <UserPurchaseReport userId={decode.user_id} />
      </div>
    </>
  );
}

export default UserProfile;
