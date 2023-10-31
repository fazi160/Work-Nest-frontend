import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../admin&Customer/Navbar';
import Dashboard from '../../admin&Customer/Dashboard';
import CustomerCowork from './CustomerCowork';
import CustomerConference from './CustomerConference';
import SalesReport from '../../admin&Customer/SalesReport';
import Notification from '../../admin&Customer/Notification';
import Chat from '../../admin&Customer/Chat';
import jwtDecode from 'jwt-decode';
import SideNavbar from '../../admin&Customer/SideNavbar';
import CustomerDetails from './CustomerDetails';

function CustomerHome() {
  
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
    <>
      <Navbar/>
      <SideNavbar onPageSelect ={handlePageSelection}/>
      <div>
        {pages === 'Dashboard' && <Dashboard/>}
        {pages === 'Co-Working Space' && <CustomerCowork/>}
        {pages === 'Conference Hall' && <CustomerConference/>}
        {pages === 'Sales Report' && <SalesReport/>}
        {pages === 'Notification' && <Notification/>}
        {pages === 'Chat' && <Chat/>}
        {pages === 'User Info' && <CustomerDetails/>}
      </div>

    </>
  )
}

export default CustomerHome
