import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCustomerData } from "../../../../context/ContextCustomer";
import jwtDecode from "jwt-decode";
import { Card, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BaseUrl } from "../../../../constants/constants";

function CustomerSalesReport() {
    const customerData = useCustomerData();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [reportType, setReportType] = useState("hall"); // Default to "Conference Hall Sales Report"
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
  
    useEffect(() => {
      const apiUrl = `${BaseUrl}/space/${reportType}/salesreport/`;
      const requestData = { params: { user_id: decode.user_id } };
  
      axios
        .get(apiUrl, requestData)
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, [reportType]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <Card>
        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
          Sales Report for {reportType === "conference" ? "Conference Hall" : "Coworking Space"}
        </Typography>
  
        {/* Selection Dropdown */}
        <FormControl sx={{ marginBottom: 2 }}>
          <InputLabel id="report-type-label">Select Report Type</InputLabel>
          <Select
            labelId="report-type-label"
            id="report-type-select"
            value={reportType}
            label="Select Report Type"
            onChange={(e) => setReportType(e.target.value)}
          >
            <MenuItem value="hall">Conference Hall</MenuItem>
            <MenuItem value="co-work">Coworking Space</MenuItem>
          </Select>
        </FormControl>
  
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-2">User Email</th>
              <th className="py-2">Space Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((result) => (
              <tr key={result.id} className="border-t">
                <td className="py-3">{result.user_detail.email}</td>
                <td className="py-3">
                  {result.hall_detail && result.hall_detail.name
                    ? result.hall_detail.name
                    : result.space_details && result.space_details.name
                    ? result.space_details.name
                    : ""}
                </td>
                <td className="py-3">{result.price}</td>
                <td className="py-3">{result.booking_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }

export default CustomerSalesReport
