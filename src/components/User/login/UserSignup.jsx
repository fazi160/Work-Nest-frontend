import React, { useState, useRef } from 'react'
import backgroundImage from "../../../assets/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function UserSignup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({email:"", password:"", confirmPassword: ""});

    // process of getting email, password and confirm password
    const emailInputRef = useRef(null)
    const passInputRef = useRef(null)
    const confirmPassInputRef = useRef(null)
    console.log(user)

    //  validations for email and password
    const Validation = () => {
        if (user.email.trim() === ""){
            toast.error("Email field cannot be empty")
            return false;
        }else if (!isValidEmail(user.email.trim())) {
            setUser({email:""})
            emailInputRef.current.focus();
            toast.error("password should not be empty");
            return false;
        }else if (user.password.trim() === "") {
            passInputRef.current.focus();
            toast.error("Password should not be empty");
            return false;
        }else if (user.password !== user.confirmPassword) {
            passInputRef.current.focus();
            toast.error("Passwords are not matching")
            return false;
        }
        return true
    }

    function isValidEmail(email) {
        const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return Regex.test(email);
    }

    const FormHandlerSignup = async (e) => {
        e.preventDefault();
        if (Validation()) {
            // user.username = user.email;
            
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_AUTH_URL}UserRegister/`,
                    user
                  );
                  
             
                setUser({
                    email: "",
                    password: "",
                    confirmPassword: " ",
                })
                navigate('/user/login/')
            } catch(error){
                
                if (error.response && error.response.data) {
                    toast.error("SignUp Failed")

                }
            }
        }
    }




    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      };

  return (
  <div className="container-fluid" style={backgroundStyle}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">
              <h3 className="text-center">User Signup</h3>
            </div>
            <div className="card-body">
              <ToastContainer />
              <form onSubmit={FormHandlerSignup}>
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
                <div className="form-group my-4">
                  <input
                    ref={confirmPassInputRef}
                    type="Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-dark col-md-4">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
