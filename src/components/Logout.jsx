import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user's session data from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
