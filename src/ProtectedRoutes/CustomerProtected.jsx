import React, { useEffect } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import UserHomePage from '../pages/User/UserHomePage';
import CustomerHomePage from '../pages/Customer/CustomerHomePage';
import AdminHomePage from '../pages/Admin/AdminHomePage';

import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { CustomerDataProvider } from '../context/ContextCustomer'; // Replace with the actual path

function CustomerProtected() {
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userId = decode.user_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://127.0.0.1:8000/auth/userdetail/${userId}/`;
        const response = await Axios.get(apiUrl);
        // Assuming the customer data is available in response.data.customer_data
        // Modify this based on your actual API response structure
        const customerData = response.data.customer_data;

        // Update the context with the fetched customer data
        setCustomerData(customerData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    // Fetch data when any of the specified routes is accessed
    const shouldFetchData =
      window.location.pathname === '/' ||
      window.location.pathname === '/chat' ||
      window.location.pathname === '/payment/success' ||
      window.location.pathname === '/payment/canceled';

    if (shouldFetchData) {
      fetchData();
    }
  }, [userId]);

  if (token) {
    if (decode.user_type === 'user') {
      return <UserHomePage />;
    } else if (decode.user_type === 'customer') {
      return (
        <CustomerDataProvider>
          <Outlet />
        </CustomerDataProvider>
      );
    } else if (decode.user_type === 'admin') {
      return <AdminHomePage />;
    } else {
      console.log(decode, 'the else case of Customer Protected');
    }
  } else {
    console.log(decode, 'the else case of Customer Protected if this was null it means no data there to decode');
  }
}

export default CustomerProtected;
