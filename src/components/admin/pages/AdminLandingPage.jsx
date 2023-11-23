import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import CustomerList from './CustomerList';
import Notification from '../../admin&Customer/Notification';
import SalesReport from '../../admin&Customer/SalesReport';
import UserList from './UserList';
import Navbar from '../../admin&Customer/Navbar';
import SideNavbar from '../../admin&Customer/SideNavbar';
import Dashboard from '../../admin&Customer/Dashboard';
import PremiumAdmin from './PremiumAdmin';


function AdminLandingPage() {
  const [pages,setPages] =useState(localStorage.getItem('currentPage') || 'Dashboard')

  const navigate = useNavigate();

  const handlePageSelection = (page) => {
    setPages(page);
    localStorage.setItem('currentPage', page); // Store the selected page in local storage
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      const decode = jwtDecode(token);
      console.log(decode.user_type, "user type show");
    }
  }, [navigate]);
  
  return (
    
    <div>
      <Navbar/>
      <SideNavbar onPageSelect={handlePageSelection} />
      <div>
        {pages === 'Dashboard' && <Dashboard />}
        {pages === 'Customer List' && <CustomerList />}
        {pages === 'Notification' && <Notification />}
        {pages === 'Sales Report' && <SalesReport />}
        {pages === 'User List' && <UserList />}
        {pages === 'Premium' && <PremiumAdmin />}
      </div>
    </div>
  );

}

export default AdminLandingPage
