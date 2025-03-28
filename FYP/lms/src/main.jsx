import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import Provider

const CLIENT_ID = "608105958781-m5jatqf9qvr3a8r35k35hmrl7a1sg8t6.apps.googleusercontent.com"; // Replace with your actual Client ID

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
