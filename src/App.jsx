import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRouter from "./routes/admin";
import CustomerRoutes from "./routes/Customer";
import UserRoutes from "./routes/User";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";
import { wsApiUrl } from "./constants/constants";

function App() {
  console.log("app.jsx is working  fjsakjdfjkjakfda");
  // const [notifications, setNotifications] = useState([]);
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {

  
  //   const wsUrl = `${wsApiUrl}/ws/notification/`;
  
  //   const connectWebSocket = () => {
  //     const client = new W3CWebSocket(wsUrl);
  
  //     client.onopen = (e) => {
  //       console.log("WebSocket connection opened:", e);
  //     };
  
  //     client.onclose = (e) => {
  //       console.log("WebSocket connection closed:", e);
  //       setTimeout(connectWebSocket, 15000);
  //     };
  
  //     client.onerror = (e) => {
  //       console.error("WebSocket connection error:", e);
  //     };
  
  //     client.onmessage = (message) => {
        
  //       const data = JSON.parse(message.data);
  //       setNotifications((prevNotifications) => [...prevNotifications, data]);
  //       showNotification(data.message);
  //     };
  
  //     return () => {
  //       console.log("Cleaning up WebSocket connection...");
  //       client.close();
  //     };
  //   };
  
  //   // Start the initial connection
  //   connectWebSocket();
  // }, []);
  

  // const showNotification = (message) => {
  //   // Check if the browser supports notifications
  //   if (!("Notification" in window)) {
  //     console.log("This browser does not support desktop notification");
  //     return;
  //   }

  //   // Check if the user has granted permission for notifications
  //   if (Notification.permission === "granted") {
  //     // Create and show the notification
  //     const notification = new Notification("New Notification", {
  //       body: message,
  //     });

  //     // Close the notification after a few seconds (adjust as needed)
  //     setTimeout(notification.close.bind(notification), 50000);
  //   } else if (Notification.permission !== "denied") {
  //     // Request permission from the user
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         // Create and show the notification
  //         const notification = new Notification("New Notification", {
  //           body: message,
  //         });

  //         // Close the notification after a few seconds (adjust as needed)
  //         setTimeout(notification.close.bind(notification), 5000);
  //       }
  //     });
  //   }
  // };

  return (
    <div>
      <h1>It's working</h1>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="/customer/*" element={<CustomerRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
