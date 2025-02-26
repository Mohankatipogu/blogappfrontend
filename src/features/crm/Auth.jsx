import React, { useState } from "react";
import { signInWithGoogle, logout } from "./firebaseconfig";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loggedInUser = await signInWithGoogle();
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      navigate("/dashboard");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 justify-content-center">
      {!user ? (
        <button className="btn btn-primary" onClick={handleLogin}>
          Sign in with Google
        </button>
      ) : (
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
