import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCustomerData } from '../../../../context/ContextCustomer';
import jwtDecode from 'jwt-decode';
import { Card, Typography, Button } from '@mui/material';
function ConferenceHallSalesReport() {
  const customerData = useCustomerData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/space/hall/salesreport/';  // Remove the user ID from the URL
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
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Space Sales Report
      </Typography>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="py-2">User Email</th>
            <th className="py-2">Package Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Exp Date</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((result) => (
            <tr key={result.id} className="border-t">
              <td className="py-3">{result.user_detail.email}</td>
              <td className="py-3">{result.hall_detail.name}</td>
              <td className="py-3">{result.price}</td>
              <td className="py-3">{result.booking_date}</td>
          
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ConferenceHallSalesReport;
