import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import Modal from "react-modal";
import jwtDecode from "jwt-decode";
import PremiumSalesReport from "../admin/pages/PremiumSalesReport";
import ConferenceHallSalesReport from "../Customer/Pages/salesReport/ConferenceHallSalesReport";

const SalesReport = () => {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);

    if (decode.user_type === "admin") {
      setUserType("admin");
    } else if (decode.user_type === "customer") {
      setUserType("customer");
    } else {
      setUserType("");
    }
  }, []);

  return (
    <div style={{ marginLeft: "16rem", marginRight: "1.5rem" }}>
      <div>{userType === "admin" ? <PremiumSalesReport /> : null}</div>
      <div>{userType === "customer" ? <ConferenceHallSalesReport /> : null}</div>
    </div>
  );
};

export default SalesReport;
