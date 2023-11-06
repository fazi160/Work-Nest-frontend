import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';
import WebSocketInstance from './WebSocketInstance';

function Notification() {
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userType = decode.user_type;
  let apiUrl = '';
  if (userType === 'admin') {
    apiUrl = 'http://127.0.0.1:8000/notification/admin_notification/';
  }
  if (userType === 'customer') {
    apiUrl = '';
  }

  const [notifications, setNotifications] = useState([]);
  const [realTimeNotifications, setRealTimeNotifications] = useState([]); // New state for real-time notifications

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setNotifications(response.data.results);
    });

    // Connect to WebSocket and listen for notifications
    WebSocketInstance.connect();
    WebSocketInstance.listenForNotifications((message) => {
      // Handle real-time notifications here
      console.log('Received notification:', message);

      // Update real-time notifications state
      setRealTimeNotifications((prevNotifications) => [message, ...prevNotifications]);
    });

    return () => {
      // Disconnect from WebSocket when the component unmounts
      WebSocketInstance.disconnect();
    };
  }, [userType]);

  return (
    <Container maxWidth="md">
      <h1>Notifications</h1>
      {realTimeNotifications.map((notification) => (
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
