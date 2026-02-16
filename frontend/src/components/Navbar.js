import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");      
    localStorage.removeItem("isLoggedIn");
    navigate("/");                       
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#111",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <h3>EventHub Management</h3>

      <button
        onClick={handleLogout}
        style={{
          background: "crimson",
          border: "none",
          color: "white",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
