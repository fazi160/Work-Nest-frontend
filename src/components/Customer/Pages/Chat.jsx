import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@mui/icons-material/Send";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { wsApiUrl } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  chatSection: {
    width: "100%",
    height: "75vh",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "60vh",
    overflowY: "auto",
    borderTop: "none",
    padding: theme.spacing(2),
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(2),
  },
  userAvatar: {
    display: "flex",
    alignItems: "center",
  },
  videoCallButton: {
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    marginLeft: theme.spacing(2),
  },
  chatContainer: {
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "100%",
  },
}));

function Chat() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [senderdetails, setSenderDetails] = useState({});
  const [recipientdetails, setRecipientDetails] = useState({});
  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const lastMessageRef = useRef();

  const handleVideoCallClick = () => {
    console.log("Recipient Details:", recipientdetails);
    console.log("Sender Details:", senderdetails);

    if (recipientdetails && senderdetails) {
      const data = [senderdetails, recipientdetails];

      if (data[1]) {
        console.log("Navigating to /customer/videocall with data:", data);
        const messageData = {
          message: `http://localhost:5173/user/videocall?roomId=${senderdetails.id}&receiverId=${recipientdetails.id}`,
          senderUsername: senderdetails.email,
          receiverUsername: recipientdetails.email,
        };

        clientstate.send(JSON.stringify(messageData));

        navigate("/customer/videocall", { state: { data: data } });
      } else {
        console.error("Data is empty. Unable to initiate video call.");
      }
    } else {
      console.error("Recipient details or sender details are missing.");
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Tab is visible, reconnect WebSocket if needed");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
    userAxiosInstant
      .get(
        `chat/user-previous-chats/${senderdetails.id}/${recipientdetails.id}/`
      )
      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      });
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
      console.log("Websocket disconnected", event.reason);
    };

    return () => {
      client.close();
    };
  };

  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (senderdetails.id != null && recipientdetails.id != null) {
      setUpChat();
    }
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [senderdetails, recipientdetails]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setSenderDetails({ id: decode.user_id, email: decode.email });
    const apiUrl = "http://127.0.0.1:8000/chat/userlist/";
    axios.get(apiUrl).then((Response) => {
      
      setCustomers(Response.data.results);
    });
  }, []);

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
    <div style={{ marginLeft: "15rem" }}>
      <div>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="John Wick" />
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              {customers.map((customer) => (
                <div
                  onClick={() => {
                    setRecipientDetails({
                      id: customer.id,
                      email: customer.email,
                    });
                  }}
                >
                  <ListItem button key={customer.email}>
                    <ListItemIcon>
                      <Avatar alt="User" src={customer.avatar} />
                    </ListItemIcon>
                    <ListItemText primary={customer.email} />
                  </ListItem>
                </div>
              ))}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.userAvatar}>
                    <Avatar
                      alt="User"
                      src="https://material-ui.com/static/images/avatar/2.jpg"
                      className="m-2"
                    />
                    <Typography variant="h6">Cindy Baker</Typography>
                  </div>
                  <Fab
                    color="primary"
                    aria-label="video-call"
                    className={classes.videoCallButton}
                    onClick={handleVideoCallClick}
                  >
                    <VideoCallIcon />
                  </Fab>
                </div>
              </Grid>
            </Grid>

            <List className={classes.messageArea}>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <Grid container>
                  <Grid item xs={12}>
                    {senderdetails.email === message.sender_email ||
                    recipientdetails.email !== message.sender_email ? (
                      // Render message aligned to the right for the sender
                      <ListItemText
                        align="right"
                        primary={
                          renderButtonIfLink(message.message)
                            ? renderButtonIfLink(message.message)
                            : message.message
                        }
                      />
                    ) : (
                      // Render message aligned to the left for the recipient
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


            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  inputProps={{ ref: messageRef }}
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                />
              </Grid>
              <Grid xs={1} align="right" onClick={onButtonClicked}>
                <Fab color="primary" aria-label="add">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Chat;
