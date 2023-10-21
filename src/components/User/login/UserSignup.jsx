import React, { useState, useRef } from 'react';
import backgroundImage from '../../../assets/login.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function UserSignup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false); // Track if the form is submitting

  // Refs for input fields
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const confirmPassInputRef = useRef(null);

  // Validation for email and password
  const Validation = () => {
    if (user.email.trim() === '') {
      toast.error('Email field cannot be empty');
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: '', password: '', confirmPassword: '' });
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
    }
    return true;
  };

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const FormHandlerSignup = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent multiple submissions

    if (Validation()) {
      setSubmitting(true); // Set to submitting state

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_AUTH_URL}UserRegister/`,
          user
        );

        setUser({
          email: '',
          password: '',
          confirmPassword: '',
        });

        // Display success message
        toast.success('Please check your email to confirm.');
        navigate('/user/login/');
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
    <div className="container-fluid" style={backgroundStyle}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">User Signup</h3>
            </div>
            <div className="card-body">
              <ToastContainer />
              <form onSubmit={FormHandlerSignup}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    ref={confirmPassInputRef}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-dark" disabled={submitting}>
                    {submitting ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </div>
                <p className="text-center mt-3">
                  Already have an account? <Link to="/user/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
