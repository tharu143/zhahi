import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-100  to-purple-400">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Zhahi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
