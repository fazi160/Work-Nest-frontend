import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSignin } from "../../../services/adminApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundImage from '../../../assets/login.jpg';

function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  // Validations
  const Validation = () => {
    if (user.email.trim() === '') {
      toast.error('Email should not be empty');
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: '' });
      emailInputRef.current.focus();
      toast.warn('Enter a valid email');
      return false;
    } else if (user.password.trim() === '') {
      passInputRef.current.focus();
      toast.error('Password should not be empty');
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  // After form submission
  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (Validation()) {
      AdminSignin(user)
        .then((res) => {
          if (res.status === 200) {
            const token = JSON.stringify(res.data);
            localStorage.setItem("token", token);
            toast.success('Login successful');
            navigate('/admin/');
          } else {
            toast.error('Invalid login credentials');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Login failed');
        });
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div className="container mx-auto" style={backgroundStyle}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-96"> {/* Adjust the card width */}
          <div className="bg-white shadow-md rounded p-8">
            <div className="mb-4">
              <h3 className="text-center text-2xl">Admin Login</h3>
              <p className="text-center">Enter your email and password</p> {/* Add the headline */}
            </div>
            <ToastContainer />
            <form onSubmit={FormHandlerLogin}>
              <div className="mb-4">
                <h4>Email</h4> {/* Add headline for email input */}
                <input
                  ref={emailInputRef}
                  type="email"
                  value={user.email}
                  id="email"
                  name="email"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <h4>Password</h4> {/* Add headline for password input */}
                <input
                  ref={passInputRef}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Password"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="bg-black text-white py-2 px-4 w-1/2">Sign In</button> {/* Adjust button width */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
