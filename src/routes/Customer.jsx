import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../ProtectedRoutes/PrivteRoutes";
import CustomerProtected from "../ProtectedRoutes/CustomerProtected";
import CustomerHomePage from "../pages/Customer/CustomerHomePage";
import CustomerLoginPage from "../pages/Customer/CustomerLoginPage";
import CustomerSignuPage from "../pages/Customer/CustomerSignuPage";
import CustomerZegoVideo from "../components/Customer/Pages/CustomerZegoVideo";
import Chat from "../components/Customer/Pages/Chat";
import SuccessfulPayment from "../components/Customer/Pages/payment/SuccessfulPayment";
import CanceledPayment from "../components/Customer/Pages/payment/CanceledPayment";

function CustomerRoutes() {
  return (
    <Routes>
        <Route path="/videocall" element={<CustomerZegoVideo />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/signup" element={<CustomerSignuPage />} />
        <Route path="/login" element={<CustomerLoginPage />} />
      </Route>

      <Route element={<CustomerProtected />}>
        <Route path="/" element={<CustomerHomePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/payment/success" element={<SuccessfulPayment />} />
        <Route path="/payment/canceled" element={<CanceledPayment />} />
      </Route>
    </Routes>
  );
}

export default CustomerRoutes;
