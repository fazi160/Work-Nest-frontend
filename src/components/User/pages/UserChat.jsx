import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { BaseUrl, reactUrl, wsApiUrl } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Grid,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
} from "@mui/material";

function UserChat() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [senderdetails, setSenderDetails] = useState({});
  const [recipientdetails, setRecipientDetails] = useState({});
  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const lastMessageRef = useRef();

  const handleVideoCallClick = () => {
    if (recipientdetails && senderdetails) {
      const data = [senderdetails, recipientdetails];

      if (data[1]) {
        const messageData = {
          message: `${reactUrl}/customer/videocall?roomId=${senderdetails.id}&receiverId=${recipientdetails.id}`,
          senderUsername: senderdetails.email,
          receiverUsername: recipientdetails.email,
        };

        clientstate.send(JSON.stringify(messageData));

        navigate("/user/videocall", { state: { data: data } });
      } else {
        console.error("Data is empty. Unable to initiate video call.");
      }
    } else {
      console.error("Recipient details or sender details are missing.");
    }
  };

  const onButtonClicked = () => {
    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.email,
        receiverUsername: recipientdetails.email,
      })
    );
    messageRef.current.value = "";
    scrollToLastMessage();
  };

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const setUpChat = () => {
    const client = new W3CWebSocket(
      `${wsApiUrl}/ws/chat/${senderdetails.id}/?${recipientdetails.id}`
    );
    setClientState(client);

    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender_username: dataFromServer.senderUsername,
          },
        ]);
      }
    };

    client.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    if (senderdetails.id && recipientdetails.id) {
      userAxiosInstant
        .get(
          `chat/user-previous-chats/${senderdetails.id}/${recipientdetails.id}/`
        )
        .then((response) => {
          if (response.status === 200) {
            setMessages(response.data);
          }
        });
      setUpChat();
    }
  }, [senderdetails, recipientdetails]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setSenderDetails({ id: decode.user_id, email: decode.email });
    const apiUrl = `${BaseUrl}/chat/customerlist/`;
    axios.get(apiUrl).then((response) => {
      setData(response.data.results);
    });
  }, []);

  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderButtonIfLink = (message) => {
    const linkRegex = /https?:\/\/[^\s]+/g; // Regular expression to match URLs

    // Check if the message contains a link
    const hasLink = linkRegex.test(message);

    if (hasLink) {
      return (
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => {
            // Handle button click action (e.g., navigate to the link)
            window.open(message, "_blank");
          }}
        >
          Video Call Link
        </button>
      );
    }

    return null; // Return null if there is no link
  };

  return (
    <div>
      <Grid
        container
        component={Paper}
        style={{
          width: "100%",
          height: "75vh",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary={senderdetails.email} />
            </ListItem>
          </List>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <List>
            {data.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setRecipientDetails({
                    id: user.id,
                    email: user.email,
                  });
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Avatar alt="User" src={user.avatar} />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
              </div>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar className="m-2" />
                  <Typography variant="h6">{recipientdetails.email}</Typography>
                </div>
                <Fab
                  color="primary"
                  aria-label="video-call"
                  style={{ backgroundColor: "#f0f0f0" }}
                  onClick={handleVideoCallClick}
                >
                  <VideoCallIcon />
                </Fab>
              </div>
            </Grid>
          </Grid>

          <List
            style={{
              height: "60vh",
              overflowY: "auto",
              borderTop: "none",
              padding: "16px",
            }}
          >
            {messages.map((message, index) => (
              <ListItem
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <Grid container>
                  <Grid item xs={12}>
                    {senderdetails.email === message.sender_email ||
                    recipientdetails.email !== message.sender_email ? (
                      <ListItemText
                        align="right"
                        primary={
                          renderButtonIfLink(message.message) ? (
                            <span className="text-red-500 font-bold">
                              Video Call Request Has Been Sended
                            </span>
                          ) : (
                            message.message
                          )
                        }
                      />
                    ) : (
                      <ListItemText
                        align="left"
                        primary={
                          renderButtonIfLink(message.message)
                            ? renderButtonIfLink(message.message)
                            : message.message
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>

          <Grid container style={{ margin: ".9rem" }}>
            <Grid item xs={11}>
              <TextField
                inputProps={{ ref: messageRef }}
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                style={{ marginLeft: ".5rem" }}
                onClick={onButtonClicked}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserChat;
