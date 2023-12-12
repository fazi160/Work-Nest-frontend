import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import {
  Button,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  Modal,
} from "@mui/material";
import { BaseUrl } from "../../../constants/constants";
import { useCustomerData } from "../../../context/ContextCustomer";

function CustomerDetails() {
  const customerData = useCustomerData();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  console.log(customerData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [customerDetail, setCustomerDetail] = useState("");
  const [customerDetailsPremium, setCustomerDetailsPremium] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    user: decode.user_id,
    company_name: "",
    contact: "",
    description: "",
  });

  useEffect(() => {
    // Initialize state variables with customer data
    if (customerData) {
      setCustomerDetail(customerData.customer_data);
      if (!customerData.premium_expired) {
        setCustomerDetailsPremium(customerData.premium_customer_data);
      } else {
        setCustomerDetailsPremium("");
      }
      setEditedContact(customerData.customer_data.contact);
      setEditedDescription(customerData.customer_data.description);
    }
  }, [customerData]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    const data = {
      contact: editedContact,
      description: editedDescription,
    };

    Axios.patch(`${BaseUrl}/auth/customerdetails/${customerDetail.id}/`, data)
      .then((response) => {
        setCustomerDetail(response.data); // Update customerDetails state
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleCreateClick = () => {
    setIsCreate(true);
  };

  const handleCreateClose = () => {
    setIsCreate(false);
  };

  const handleCreateSave = () => {
    Axios.post(`${BaseUrl}/auth/customerdetails/`, newCustomer)
      .then((response) => {
        setCustomerDetail(response.data);
        setIsCreate(false);
      })
      .catch((error) => {
        console.error("Error creating customer detail:", error);
      });
  };

  return (
    <div style={{ marginLeft: "15rem" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          style={{
            marginTop: "50px",
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Customer Details
        </Typography>

        {customerDetail ? (
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              margin: "20px auto",
              borderRadius: "10px",
              background: "#f4f4f4",
              maxWidth: "1200px",
              maxHeight: "600px",
              textAlign: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} style={{ margin: "0 auto" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: "bold" }}
                >
                  Email: {decode.email}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "10px" }}>
                  Company Name: {customerDetail.company_name}
                </Typography>
                {isEditing ? (
                  <div>
                    <TextField
                      label="Contact"
                      fullWidth
                      value={editedContact}
                      onChange={(e) => setEditedContact(e.target.value)}
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <Typography variant="body1">
                      Contact: {customerDetail.contact}
                    </Typography>
                    <Typography variant="body1">
                      Description: {customerDetail.description}
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>

            {!customerDetail.company_name && !isEditing && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
                style={{
                  marginTop: "20px",
                  backgroundColor: "#2196f3",
                }}
              >
                Create
              </Button>
            )}

            {customerDetail.company_name && isEditing && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
                style={{
                  marginTop: "20px",
                  backgroundColor: "#4caf50",
                }}
              >
                Save
              </Button>
            )}

            {customerDetail.company_name && !isEditing && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditClick}
                style={{
                  marginTop: "20px",
                  backgroundColor: "#2196f3",
                }}
              >
                Edit
              </Button>
            )}
          </Paper>
        ) : (
          <p>Loading customer details...</p>
        )}

        {customerDetailsPremium ? (
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              marginTop: "20px",
              borderRadius: "10px",
              background: "#f4f4f4",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Premium Plan Details
            </Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Start Date: {customerDetailsPremium.start_date}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              End Date: {customerDetailsPremium.exp_date}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Active: {customerDetailsPremium.is_active ? "Yes" : "Yes"}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Package Name: {customerDetailsPremium.package_details.name}
            </Typography>

            {customerDetailsPremium.exp_date <
              new Date().toISOString().split("T")[0] && (
              <Typography
                variant="body1"
                style={{ color: "red", textAlign: "center" }}
              >
                Premium plan has expired
              </Typography>
            )}
          </Paper>
        ) : (
          <p>Loading premium details...</p>
        )}

        {isCreate && (
          <Modal open={isCreate} onClose={handleCreateClose}>
            <div>
              <h2>Create Customer Detail</h2>
              <TextField
                label="Company Name"
                fullWidth
                value={newCustomer.company_name}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    company_name: e.target.value,
                  })
                }
              />
              <TextField
                label="Contact"
                fullWidth
                value={newCustomer.contact}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, contact: e.target.value })
                }
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={newCustomer.description}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    description: e.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateSave}
                style={{
                  marginTop: "20px",
                  backgroundColor: "#4caf50",
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateClose}
                style={{
                  marginTop: "20px",
                }}
              >
                Cancel
              </Button>
            </div>
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default CustomerDetails;
