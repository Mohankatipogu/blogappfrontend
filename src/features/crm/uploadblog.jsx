import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const BlogUpload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const navigate = useNavigate();

  // 🔹 Redirect to login if no token is found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setPreviewVideo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const res = await axios.post("http://localhost:5001/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Attach token to request
        },
      });

      setMessage(res.data.message);
      setTitle("");
      setContent("");
      setImage(null);
      setVideo(null);
      setPreviewImage(null);
      setPreviewVideo(null);

      if (res.data.message === "Blog uploaded successfully") {
        navigate("/");
      }
    } catch (err) {
      setMessage("Error uploading blog");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Upload Blog</h2>

        {message && <p className="alert alert-info text-center">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="img-fluid mt-2"
                style={{ maxHeight: "200px", borderRadius: "10px" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Video</label>
            <input
              type="file"
              className="form-control"
              accept="video/*"
              onChange={handleVideoChange}
            />
            {previewVideo && (
              <video controls className="w-100 mt-2" style={{ maxHeight: "200px", borderRadius: "10px" }}>
                <source src={previewVideo} type="video/mp4" />
              </video>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Upload Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogUpload;
