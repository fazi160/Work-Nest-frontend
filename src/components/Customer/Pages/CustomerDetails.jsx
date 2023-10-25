import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Button, Typography, Paper, Container, Grid, TextField } from '@mui/material';

function CustomerDetails() {
  const [customerData, setCustomerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  console.log(decode);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/auth/customerdetails/?user=${userId}`;
    Axios.get(apiUrl)
      .then((response) => {
        console.log(response);
        const filteredData = response.data.find((item) => item.user === userId);
        setCustomerData(filteredData);
        setEditedContact(filteredData.contact);
        setEditedDescription(filteredData.description);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, [userId]);
  console.log(customerData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    const data = {
      contact: editedContact,
      description: editedDescription,
    };

    Axios.patch(`http://127.0.0.1:8000/auth/customerdetails/${customerData.id}/`, data)
      .then((response) => {
        setCustomerData(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  return (
    <div style={{ marginLeft: '15rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" style={{ marginTop: '20px', marginBottom: '20px' }}>
          Customer Details
        </Typography>
        {customerData ? (
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" component="h2">Email: {decode.email}</Typography>
                <Typography variant="body1">ID: {customerData.id}</Typography>
                <Typography variant="body1">Company Name: {customerData.company_name}</Typography>
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
                    <Typography variant="body1">Contact: {customerData.contact}</Typography>
                    <Typography variant="body1">Description: {customerData.description}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
                style={{ marginTop: '20px' }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditClick}
                style={{ marginTop: '20px' }}
              >
                Edit
              </Button>
            )}
          </Paper>
        ) : (
          <p>Loading customer details...</p>
        )}
      </Container>
    </div>
  );
}

export default CustomerDetails;
