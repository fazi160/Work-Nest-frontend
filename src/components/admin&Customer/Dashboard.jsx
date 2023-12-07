// based on the user type change data by decoding 'token'
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../admin/pages/AdminDashboard";
import CustomerDashboard from "../Customer/Pages/CustomerDashboard";

function Dashboard() {
  const [userType, setUserType] = useState(null);
  const [userCount, setuserCount] = useState(null);
  const [revenues, setRevenues] = useState(null);
  const [conferenceSales, setConferenceSales] = useState(null);
  const [coworkSales, setCoworkSales] = useState(null);
  const [premiumPlanSales, setPremiumPlanSales] = useState(null);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  useEffect(() => {
    if (decode) {
      setUserType(decode.user_type);
    }
  }, [decode]);

  return (
    <div style={{ marginLeft: "15rem" }}>
      <div className="bg-gray-100 min-h-screen p-8">
        <h1 className="flex justify-center uppercase text-3xl font-bold mb-4">
          Welcome to the {userType} Dashboard
        </h1>
        {userType && userType === "admin" && (
          <>
            <AdminDashboard />
          </>
        )}

        {userType && userType === "customer" && (
          <>
            <CustomerDashboard  user_id={decode.user_id}/>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
