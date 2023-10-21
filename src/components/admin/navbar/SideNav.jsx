import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Person, Assessment, Notifications, ExitToApp, Menu } from '@mui/icons-material';
import AdminLandingPage from '../pages/AdminLandingPage'; //dashboard
import CustomerList from '../pages/CustomerList'; //Customer List
import Notification from '../pages/Notification'; //User List
import SalesReport from '../pages/SalesReport'; //Sales Report
import UserList from '../pages/UserList'; //Notification


function SideNav() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard'); // Set the default active item

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const openSidebar = () => {
    setOpen(true);
  };

  const handleItemClick = (text) => {
    setActiveItem(text);
  };

  return (
    <div className={`fixed transition-all duration-500 ${open ? 'w-60' : 'w-14'} bg-gray-800 text-white`} style={{ height: '100%' }}>
      <div className="p-4 flex items-center justify-between">
        <button className="text-2xl focus:outline-none" onClick={toggleSidebar}>
          {open ? (
            <Menu style={{ fontSize: 32 }} />
          ) : (
            <Menu style={{ fontSize: 32}} />
          )}
        </button>
      </div>
      <ul>
        <ListItem text="Dashboard" icon={<Home style={{ fontSize: 32 }} />} active={activeItem === 'Dashboard'} onItemClick={handleItemClick} />
        <ListItem text="Customer List" icon={<Person style={{ fontSize: 32 }} />} active={activeItem === 'Customer List'} onItemClick={handleItemClick} />
        <ListItem text="User List" icon={<Person style={{ fontSize: 32 }} />} active={activeItem === 'User List'} onItemClick={handleItemClick} />
        <ListItem text="Sales Report" icon={<Assessment style={{ fontSize: 32 }} />} active={activeItem === 'Sales Report'} onItemClick={handleItemClick} />
        <ListItem text="Notification" icon={<Notifications style={{ fontSize: 32 }} />} active={activeItem === 'Notification'} onItemClick={handleItemClick} />
        <ListItem text="Log Out" icon={<ExitToApp style={{ fontSize: 32 }} />} active={activeItem === 'Log Out'} onItemClick={handleItemClick} />
        {/* Add other list items here */}
      </ul>
    </div>
  );
}

function ListItem({ text, icon, active, onItemClick }) {
  const itemClass = active ? 'bg-blue-600' : 'hover-bg-gray-700';

  return (
    <button className={`py-4 px-4 flex items-center transition duration-300 ${itemClass}`} onClick={() => onItemClick(text)}>
      {icon}
      <span className="pl-2"> {text}</span>
    </button>
)}

export default SideNav;
