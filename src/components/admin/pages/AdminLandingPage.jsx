import React, { useEffect, useRef, useState } from 'react';


import CustomerList from './CustomerList';
import Notification from '../../admin&Customer/Notification';
import SalesReport from '../../admin&Customer/SalesReport';
import UserList from './UserList';
import Navbar from '../../admin&Customer/Navbar';
import SideNavbar from '../../admin&Customer/SideNavbar';
import Dashboard from '../../admin&Customer/Dashboard';


function AdminLandingPage() {
  const [pages,setPages] =useState("Dashboard")
  const handlePageSelection = (page) => {
    console.log(page, "on the main page");
    setPages(page)
  }
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
      </div>
    </div>
  );

}

export default AdminLandingPage
