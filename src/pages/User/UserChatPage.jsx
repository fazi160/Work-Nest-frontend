import React from "react";
import UserNavbar from "../../components/User/pages/homepage/UserNavbar";
import UserChat from "../../components/User/pages/UserChat";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function UserChatPage() {
  // console.log("here we goooooooooooooooooooooooooo");
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // if (token) {
  //   const decode = jwtDecode(token);
  //   if (!decode.user_type === "user") {
  //     console.log("it's working");
  //     navigate("/user/login");
  //   }
  // }
  return (
    <div>
      <UserNavbar />
      <UserChat />
    </div>
  );
}

export default UserChatPage;
