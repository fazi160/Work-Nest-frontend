import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../../assets/login.jpg";
import userImage from "../../../assets/icons8-google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import {  UserGoogleSignup, userSignin } from "../../../services/userApi";
import axios from "axios";
import jwtDecode from "jwt-decode";

function UserLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  // Validations
  const Validation = () => {
    if (user.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: "" });
      emailInputRef.current.focus();
      toast.warn("Enter a valid email");
      return false;
    } else if (user.password.trim() === "") {
      passInputRef.current.focus();
      toast.error("Password should not be empty");
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  // After form submission
  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (Validation()) {
      userSignin(user)
        .then((res) => {
          if (res.status === 200) {

            const token = JSON.stringify(res.data);
            localStorage.setItem("token", token);
            toast.success("Login successful");
            navigate("/user/");
          } else {
            toast.error("Invalid login credentials");
          }
        })
        .catch((error) => {

          toast.error("Login failed");
        });
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };


 
  const [guser, setgUser] = useState([]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setgUser(codeResponse)

    },
    onError: (error) => console.log("Login Failed:", error)
  });
  
  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        if (!guser) return;
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${guser.access_token}`,
              Accept: "application/json",
            },
          }
        );
        
        const existingUser = await UserGoogleSignup(response.data);
        // const newUser = await UserGoogleSignup(response.data);
        if (existingUser.data) {
          // if the user is already exist
          const token = JSON.stringify(existingUser.data.token);
          const decoded = jwtDecode(token)

          if (decoded.user_type === "user" ) {
            localStorage.setItem("token", token)
            navigate('/user/')
          } else{
            toast.error("This is not User it's:",decoded.user_type)
          }
        }
        setgUser([])
      } catch (error) {

        if (error.response && error.response.data) {
          toast.error(error.response.data.detail)
        } else {
          toast.error("An error occurred while signup or login. ")
        }
        
      }
    }

    if (guser){
      handleGoogleAuth();
    }},[guser]);
    

    // google signIn button design
    const customGoogleLoginButton = (
      <button
        type="button"
        className="btn  custom-google-button btn-light"
        onClick={handleGoogleLogin}
      >
        <img
         src={userImage}
         alt="Google logo" 
         className="google-logo img-fluid"
         width="22"
         height="22"  />
        <span className="button-text ms-2">Continue with Google</span>
      </button>
    );
  
  return (
    <div className="container-fluid" style={backgroundStyle}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">
              <h3 className="text-center">User Login</h3>
            </div>
            <div className="card-body">
              <ToastContainer />
              <form onSubmit={FormHandlerLogin}>
                <div className="mb-3 text-center">
                  <p>Please enter your email and password</p>
                </div>
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
                  <button type="submit" className="btn btn-dark col-md-4">
                    Sign In
                  </button>
                </div>
                <div className="text-end mt-3">
                  <a href="#">Forgot password?</a>
                </div>
              </form>
              <div className="text-center my-3">
                <p>Or</p>
              </div>
              <div className="text-center">
                {customGoogleLoginButton}
              </div>
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <Link to="/user/signup">Sign up</Link> {/* Create a Link to the signup path */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default UserLogin;
