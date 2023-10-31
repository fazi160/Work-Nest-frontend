import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';

function Notification() {
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userType = decode.user_type;
  const apiUrl = 'http://127.0.0.1:8000/notification/admin_notification/';
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setNotifications(response.data.results);
      });
  }, [userType]);

  return (
    <Container maxWidth="md">
      <h1>Notifications</h1>
      {notifications.map((notification) => (
        <Card key={notification.id} style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {notification.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(notification.created_time).toLocaleString()}
            </Typography>
            <Typography variant="body1">
              {notification.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Notification;
