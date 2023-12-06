import React from "react";
import PrivateRoutes from "../ProtectedRoutes/PrivteRoutes";
import { Routes, Route } from "react-router-dom";
import UserProtected from "../ProtectedRoutes/UserProtected";
import UserHomePage from "../pages/User/UserHomePage";
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from "../pages/User/UserSignupPage";
import UserChatPage from "../pages/User/UserChatPage";
import ZegoVideoCall from "../components/ZegoVideoCall";
import AllSpaces from "../components/User/pages/AllSpaces";
import SpaceDetailedView from "../components/User/pages/checkout/SpaceDetailedView";
import UserDetailedViewPage from "../pages/User/UserDetailedViewPage";
import Checkout from "../components/User/pages/checkout/Checkout";
import Fail from "../components/User/pages/Payment/Fail";
import Success from "../components/User/pages/Payment/Success";
import UserProfilePage from "../pages/User/UserProfilePage";
function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/conferencehalls" element={<AllSpaces />} />
        <Route path="/coworkspaces" element={<AllSpaces />} />
        <Route path="/spacedetails" element={<UserDetailedViewPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/login" element={<UserLoginPage />} />
        </Route>

        <Route element={<UserProtected />}>
          <Route path="/" element={<UserHomePage />} />
          <Route path="/chat" element={<UserChatPage />} />
          <Route path="/videocall" element={<ZegoVideoCall />} />
          <Route path="spacedetails/checkout" element={<Checkout />} />
          <Route path="spacedetails/payment/canceled" element={<Fail />} />
          <Route path="dashboard/" element={<UserProfilePage />} />
          <Route path="spacedetails/payment/success" element={<Success />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserRoutes;
