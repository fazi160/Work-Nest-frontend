import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomerHomePage from '../pages/Customer/CustomerHomePage';
import AdminHomePage from '../pages/Admin/AdminHomePage';

function UserProtected() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to login if there is no token
      navigate('/user/login');
    }
  }, [token, navigate]);

  if (token) {
    const decode = jwtDecode(token);

    if (decode.user_type === 'user') {
      console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      return <Outlet />;
    } else if (decode.user_type === 'customer') {
      return <CustomerHomePage />;
    } else if (decode.user_type === 'admin') {
      return <AdminHomePage />;
    } else {
      // Handle unknown user type (optional)
      console.log(decode, 'Unknown user type in Customer Protected');
    }
  }

  // This part will not be reached if there's no token
  return null;
}

export default UserProtected;
