import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('token');
    // You can also perform additional cleanup tasks if needed
    navigate('/admin/login'); 
  };
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
