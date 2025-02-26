import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./image.png";
import { logout } from "../firebaseconfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useLoginfQuery } from "../../../services/CrmApi";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const {isLoading,data}=useLoginfQuery()
  console.log(data)
  
  const defaultProfileImg = "https://www.w3schools.com/howto/img_avatar.png"; // Default avatar
  
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(defaultProfileImg);
  const fileInputRef = useRef(null);

  // 🔹 Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setProfilePic(currentUser.photoURL || defaultProfileImg);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        setProfilePic(defaultProfileImg);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // 🔹 Logout function
  const handleLogout = async () => {
    await logout();
    window.localStorage.clear()
    navigate("/login");
  };

  // 🔹 Trigger File Input when Image is Clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 🔹 Upload Image to Firebase Storage and Update Profile
  const handleImageChange = (e) => {
    if (!e.target.files[0]) return;

    if (!auth.currentUser) {
      alert("You must be logged in to update the profile picture!");
      return;
    }

    const file = e.target.files[0];
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => console.error("Upload Error:", error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        try {
          await updateProfile(auth.currentUser, { photoURL: downloadURL });

          // ✅ Update UI
          setProfilePic(downloadURL);
          setUser({ ...auth.currentUser, photoURL: downloadURL });
          localStorage.setItem("user", JSON.stringify({ ...auth.currentUser, photoURL: downloadURL }));
          alert("Profile Picture Updated!");
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Failed to update profile. Please try again.");
        }
      }
    );
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to="/" className="navbar-brand fw-bold" style={{ marginLeft: "10%" }}>
          MyApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: "30%" }}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/blogupload" className="nav-link">Upload</Link>
            </li>

            {/* User Profile Section */}
            <li className="nav-item">
              <div className="user-profile">
                {/* Clickable Profile Picture */}
                <img
                  src={profilePic}
                  alt="User Profile"
                  className="clickable-profile"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <p>{user?.displayName || "User"}</p>
                <p>{user?.email}</p>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
