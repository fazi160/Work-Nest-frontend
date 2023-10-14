import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSignin } from "../../../services/adminApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundImage from '../../../assets/login.jpg';
function CustomerLogin() {

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
              navigate('/customer/');
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
    <div className="container-fluid" style={backgroundStyle}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-5">
          <div className="card h-1100">
            <div className="card-header">
              <h3 className="text-center">Customer Login</h3>
            </div>
            <div className="card-body">
              <ToastContainer />
              <form onSubmit={FormHandlerLogin}>
                <div className="form-group">
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={user.email}
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group my-4">
                  <input
                    ref={passInputRef}
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-dark col-md-4">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerLogin


