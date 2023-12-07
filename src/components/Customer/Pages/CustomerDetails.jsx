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
} from "@mui/material";
import { BaseUrl } from "../../../constants/constants";
import { useCustomerData } from "../../../context/ContextCustomer";

function CustomerDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [customerDetailsPremium, setCustomerDetailsPremium] = useState("");

  const customerData = useCustomerData();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  console.log(customerData);

  useEffect(() => {
    // Initialize state variables with customer data
    if (customerData) {
      setCustomerDetails(customerData.customer_data);
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

    Axios.patch(
      `${BaseUrl}/auth/customerdetails/${customerDetails.id}/`,
      data
    )
      .then((response) => {
        setCustomerDetails(response.data); // Update customerDetails state
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
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
            textAlign: "center", // Center align text
          }}
        >
          Customer Details
        </Typography>

        {customerDetails ? (
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              margin: "20px auto", // Center the card horizontally
              borderRadius: "10px",
              background: "#f4f4f4",
              maxWidth: "1200px", // Optionally set a max width for the card
              maxHeight:"600px",
              textAlign: "center", // Center align text within the card
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} style={{ margin: "0 auto" }}>
                {" "}
                {/* Center the grid item */}
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: "bold" }}
                >
                  Email: {decode.email}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "10px" }}>
                  Company Name: {customerDetails.company_name}
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
                      Contact: {customerDetails.contact}
                    </Typography>
                    <Typography variant="body1">
                      Description: {customerDetails.description}
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>

            {isEditing ? (
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
            ) : (
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
      </Container>
    </div>
  );
}

export default CustomerDetails;
