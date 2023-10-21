import React from 'react'
import { useNavigate } from 'react-router-dom';

function CustomerHome() {
  const navigate = useNavigate(); // Use 'navigate' instead of 'Navigate'

  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('token');
    // You can also perform additional cleanup tasks if needed
    navigate('/customer/login'); // Use 'navigate' instead of 'Navigate'
  };
  return (
    <div>
      <h1>it's customer home page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default CustomerHome
