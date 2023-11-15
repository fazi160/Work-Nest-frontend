import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZEGO_APP_ID, ZEGO_SERVER_SECRET } from "../constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import jwtDecode from "jwt-decode";

function ZegoVideo() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const location = useLocation();
  const data = location.state?.data || "";
  console.log(data);
  const senderdetails = data[0];
  const recipientdetails = data[1];
  let roomId, receiverId;
  if (data) {
    roomId = senderdetails.id.toString();
    receiverId = recipientdetails.id.toString();
  }

  if (!data) {
    const queryParams = new URLSearchParams(location.search);
    roomId = queryParams.get("roomId");
    receiverId = queryParams.get("receiverId");

    if (decode.user_id.toString() != receiverId.toString()) {
      setTimeout(() => {
        navigate("/user/chat");
      });
    }
  } else {
    roomId = senderdetails.id.toString();
    receiverId = recipientdetails.id.toString();
  }

  const handleClosingButtonClick = () => {
    // Add logic to handle closing action, for example, navigating back to the chat page
    navigate("/user/chat");
  };

  const myMeeting = async (element) => {
    // generate Kit Token
    const appID = ZEGO_APP_ID;
    const serverSecret = ZEGO_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      decode.email
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            "/customer/videocall/" +
            "?roomId=" +
            roomId +
            "&receiverId=" +
            receiverId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <>
      <div className="ml-3 mr-8 mt-4">
        <button
          className="bg-black text-white px-8 py-3 rounded"
          onClick={handleClosingButtonClick}
        >
          <ArrowBackIcon/>
        </button>
      </div>

      <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
    </>
  );
}

export default ZegoVideo;
