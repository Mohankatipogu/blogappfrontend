import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./firebaseconfig"

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container text-center mt-5">
      <h2>Welcome, {user?.displayName || "User"}!</h2>
      <img src={user?.photoURL} alt="User Profile" className="rounded-circle mt-3" width="100" />
      <p className="mt-3">{user?.email}</p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
