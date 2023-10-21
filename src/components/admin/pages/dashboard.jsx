import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import SideNav from '../navbar/SideNav';

function Dashboard() {

  return (
    <div>
      <Navbar onNavOpen={() => {}} />
      <SideNav/>

    </div>
  );
}

export default Dashboard;
