import React, { useState, useRef } from 'react';
import backgroundImage from '../../../assets/login.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerRegister() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false); // Track if the form is submitting

  // Refs for input fields
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const confirmPassInputRef = useRef(null);

  const PasswordValidation = () => {
    const strongPasswordRegex = /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


    if (user.password.trim().length < 8) {
      passInputRef.current.focus();
      toast.error('Password should be at least 8 characters long');
      return false;
    } else if (!strongPasswordRegex.test(user.password.trim())) {
      passInputRef.current.focus();
      toast.error('Password should be strong (e.g., pass@123)');
      return false;
    }

    return true;
  };

  const Validation = () => {
    if (user.email.trim() === '') {
      toast.error('Email field cannot be empty');
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      emailInputRef.current.focus();
      toast.error('Invalid email format');
      return false;
    } else if (user.password.trim() === '') {
      passInputRef.current.focus();
      toast.error('Password should not be empty');
      return false;
    } else if (user.password !== user.confirmPassword) {
      confirmPassInputRef.current.focus();
      toast.error('Passwords do not match');
      return false;
    } else if (!PasswordValidation()) {
      return false;
    }

    return true;
  };

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const FormHandlerSignup = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent multiple submissions

    if (Validation()) {
      setSubmitting(true); // Set to submitting state

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_AUTH_URL}customerRegister/`,
          user
        );

        setUser({
          email: '',
          password: '',
          confirmPassword: '',
        });

        // Display success message
        toast.success('Please check your email to confirm.');
        navigate('/customer/login/');
      } catch (error) {
        setSubmitting(false); // Reset to non-submitting state
        if (error.response && error.response.data) {
          toast.error('Signup Failed');
        }
      }
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={backgroundStyle}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-96">
          <div className="bg-white shadow-md rounded p-8">
            <h3 className="text-center text-2xl mb-4">Customer Signup</h3>
            <ToastContainer />
            <form onSubmit={FormHandlerSignup}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  value={user.email}
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  ref={passInputRef}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Password"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  ref={confirmPassInputRef}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Confirm Password"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 w-full rounded focus:outline-none hover:bg-gray-800"
                disabled={submitting}
              >
                {submitting ? 'Signing Up...' : 'Sign Up'}
              </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;
