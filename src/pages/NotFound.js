import React from "react";
import { Link } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Redirecting in 3 seconds...</p>
      <Link to="/">Go to Home</Link>
      {/* Countdown timer logikasi */}
    </div>
  );
}

export default NotFound;