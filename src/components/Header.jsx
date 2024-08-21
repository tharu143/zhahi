import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-4" />
      </div>
      <div className="flex items-center">
        <span className="mr-4">Welcome, User</span>
        <button className="bg-red-500 px-4 py-2 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
