import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import { Modal } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Button from "@material-tailwind/react";
import WebSocketInstance from "./WebSocketInstance";
import { BaseUrl } from "../../constants/constants";
import { request } from "websocket";
import { Box } from "@mui/material";
import { data } from "autoprefixer";

function Notification() {
  const [detailedDataType, setDetailedDataType] = useState("");
  const [id, setId] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [blockId, setBlockId] = useState([]);
  const [blockedNotifications, setBlockedNotifications] = useState([]);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userType = decode.user_type;
  let apiUrl = "";

  if (userType === "admin") {
    apiUrl = `${BaseUrl}/notification/admin_notification/`;
  }
  // Add conditions for other user types if needed

  const [notifications, setNotifications] = useState([]);
  const [realTimeNotifications, setRealTimeNotifications] = useState([]);

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setNotifications(response.data.results);
    });

    WebSocketInstance.connect();
    WebSocketInstance.listenForNotifications((message) => {
      // console.log("Received notification:", message);
      setRealTimeNotifications((prevNotifications) => [
        message,
        ...prevNotifications,
      ]);
    });

    return () => {
      WebSocketInstance.disconnect();
    };
  }, [userType]);

  const detailsShow = (id, type) => {
    setId(id);
    let dataType = "";
    // console.log(type,"fdsafdfsdafdsafdfgdfg");
    if (type === "conference") {
      dataType = "conference";
    } else if (type === "cospace" || type === "cowork") {
      dataType = "cowork";
    } else if (type === "register" || type === "user") {
      handleBlockUnblock(id);
      return;
    } else {
      return;
    }
    // console.log(dataType);
    setDetailedDataType(dataType);
    // console.log(dataType);
    setDetailsModalOpen(true);
    setLoadingDetails(true); // Set loading state to true
  };

  // Add a useEffect to log the updated values after state changes
  useEffect(() => {
    console.log(detailedDataType, id, "fdsaffdsdafad");
    if (detailedDataType && id) {
      const detailsApiUrl = `${BaseUrl}/notification/detailview/${detailedDataType}/${id}/`;
      console.log(detailsApiUrl);

      axios
        .get(detailsApiUrl)
        .then((response) => {
          console.log(response);
          if (!response.data) {
            // Show a toast error if the response data is empty
            toast.error("Details not found");
            return;
          }

          console.log(response.data.data, "fdsafdsfasfda");
          setDetailsData(response.data.data);
        })
        .catch((error) => {
          // Handle other types of errors, e.g., network issues
          console.error("Error fetching details:", error);
          toast.error("Failed to fetch details");
        });
    }
  }, [detailedDataType, id]);

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false); // Close the details modal
  };

  const sortedNotifications = notifications.slice().sort((a, b) => b.id - a.id);

  const blockRequest = (type, id) => {
    const blockUrl = `${BaseUrl}/notification/blockunblock/${type}/${id}/`;

    // Update the blocked status in the state immediately (optimistic update)
    setBlockedNotifications((prevBlockedNotifications) => ({
      ...prevBlockedNotifications,
      [id]: !prevBlockedNotifications[id], // Toggle the blocked status
    }));

    // Make a PUT request to the backend to perform block/unblock
    axios
      .patch(blockUrl)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Operation successful");
          // Reset the blockId state
          setBlockId([]);
        } else {
          toast.error("Failed to perform the operation");
          // Revert the state change if the backend operation fails
          setBlockedNotifications((prevBlockedNotifications) => ({
            ...prevBlockedNotifications,
            [id]: !prevBlockedNotifications[id], // Toggle back to the previous status
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
        // Revert the state change if there is an error
        setBlockedNotifications((prevBlockedNotifications) => ({
          ...prevBlockedNotifications,
          [id]: !prevBlockedNotifications[id], // Toggle back to the previous status
        }));
      });
  };

  useEffect(() => {
    // Initialize blocked status based on is_available property
    if (detailsData) {
      setBlockedNotifications((prevBlockedNotifications) => ({
        ...prevBlockedNotifications,
        [detailsData.id]: !detailsData.is_available,
      }));
    }
  }, [detailsData]);

const renderUserBlockUnblockButton = (id)=>{
    console.log(id);
    
    const blockUrl = `${BaseUrl}/notification/blockunblock/user/${id}/`;

    axios
    .patch(blockUrl)
    .then((response) => {
      if (response.status === 200) {
        toast.success("Operation successful");
        // Reset the blockId state
        setBlockId([]);
      } else {
        toast.error("Failed to perform the operation");
        // Revert the state change if the backend operation fails
        setBlockedNotifications((prevBlockedNotifications) => ({
          ...prevBlockedNotifications,
          [id]: !prevBlockedNotifications[id], // Toggle back to the previous status
        }));
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong");
      // Revert the state change if there is an error
      setBlockedNotifications((prevBlockedNotifications) => ({
        ...prevBlockedNotifications,
        [id]: !prevBlockedNotifications[id], // Toggle back to the previous status
      }));
    });

  }

  return (
    <div style={{ marginLeft: "15rem" }}>
      <Container maxWidth="100%">
        {/* <h1>Notifications</h1> */}
        <Box width="100%" overflow="auto">
          {" "}
          {/* Set maximum width and enable horizontal scrolling */}
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="text-center">Name</TableCell>
                  <TableCell className="text-center">Customer</TableCell>
                  <TableCell className="text-center">Description</TableCell>
                  <TableCell className="text-center">Created Time</TableCell>
                  <TableCell className="text-center">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {realTimeNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>{notification.name}</TableCell>
                    <TableCell>{notification.description}</TableCell>
                    <TableCell>
                      {new Date(notification.created_time).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => {
                          detailsShow(
                            notification.id,
                            notification.notification_type
                          );

                          // Conditionally invoke handleSeeMoreClick only when is_opened is false
                          if (!notification.is_opened) {
                            handleSeeMoreClick();
                          }
                        }}
                      >
                        See More
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>{notification.name}</TableCell>
                    <TableCell>{notification.user}</TableCell>
                    <TableCell>{notification.description}</TableCell>
                    <TableCell>
                      {new Date(notification.created_time).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <button
                        className="bg-blue-700 text-white px-12 py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300 whitespace-nowrap"
                        onClick={() => {
                          if (
                            notification.notification_type === "conference" ||
                            notification.notification_type === "cospace"
                          ) {
                            detailsShow(
                              notification.key,
                              notification.notification_type
                            );
                          } else if (
                            notification.notification_type === "register"
                          ) {
                            // Render block/unblock button for "register" type
                            renderUserBlockUnblockButton(notification.key);
                          }
                        }}
                      >
                        {notification.notification_type === "register"
                          ? "Block/Unblock"
                          : "See More"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {detailsData && (
          <Modal
            open={detailsModalOpen}
            onClose={handleCloseDetailsModal}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div className="bg-white p-8 max-w-md w-full">
              <h2 className="text-2xl mb-4">Details</h2>
              <img
                src={detailsData.image}
                alt={detailsData.name}
                className="mb-4 max-w-full h-auto"
              />
              <ul>
                <li className="mb-4">Name: {detailsData.name}</li>
                <li className="mb-4">Description: {detailsData.description}</li>

                {detailsData.Capacity ? (
                  <li className="mb-4">Capacity: {detailsData.Capacity}</li>
                ) : (
                  <li className="mb-4">
                    Slots: {detailsData.slots ? detailsData.slots : ""}
                  </li>
                )}

                <li className="mb-4"> Price: {detailsData.price}</li>
                <li className="mb-4">Created At: {detailsData.created_at}</li>
                <li className="mb-4">Location: {detailsData.location}</li>
              </ul>
              <div className="flex items-center justify-center">
                <button
                  className={` focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
             ${
               blockedNotifications[detailsData.id]
                 ? "dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                 : "dark:bg-red-600 dark:hover:bg-red-700"
             }`}
                  onClick={() => {
                    blockRequest(
                      detailsData.Capacity ? "conference" : "cowork",
                      detailsData.id
                    );
                  }}
                >
                  {blockedNotifications[detailsData.id] ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default Notification;
