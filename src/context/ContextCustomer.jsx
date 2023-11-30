import React, { createContext, useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Auth_url } from '../constants/constants';
// Create a context
const CustomerDataContext = createContext();

// Create a context provider component
export const CustomerDataProvider = ({ children }) => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = jwtDecode(token);
      const userId = decode.user_id;
      const apiUrl = `${Auth_url}userdetail/${userId}/`;

      Axios.get(apiUrl)
        .then((response) => {
          setCustomerData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching customer data:', error);
        });
    }
  }, []);

  // Provide the customer data to the child components
  return (
    <CustomerDataContext.Provider value={{ customerData }}>
      {children}
    </CustomerDataContext.Provider>
  );
};

// Create a custom hook to access the customer data from any component
export const useCustomerData = () => {
  const context = useContext(CustomerDataContext);
  if (!context) {
    throw new Error('useCustomerData must be used within a CustomerDataProvider');
  }
  return context.customerData;
};
