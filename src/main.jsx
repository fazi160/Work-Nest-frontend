import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <GoogleOAuthProvider clientId="208811582234-eog42g3j4cuh7g5ufphp47smbr6c5vv9.apps.googleusercontent.com">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>

);
