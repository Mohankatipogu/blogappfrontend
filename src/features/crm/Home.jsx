import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaTrash, FaEdit, FaComment } from "react-icons/fa";
import "./Home.style.css";
import { useLoginfQuery } from "../../services/CrmApi";

const API_URL = "http://localhost:5001";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [newComments, setNewComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });

  const {isLoading,data}=useLoginfQuery()
  console.log(isLoading,data)

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs`);
      setPosts(res.data);
      const likesData = {};
      const commentsData = {};
      res.data.forEach(post => {
        likesData[post._id] = post.likes || 0;
        commentsData[post._id] = false;
      });
      setLikes(likesData);
      setShowComments(commentsData);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleLike = async (id) => {
    try {
      setLikes((prevLikes) => ({ ...prevLikes, [id]: (prevLikes[id] || 0) + 1 }));
      const res = await axios.put(`${API_URL}/blogs/${id}/like`);
      setLikes((prevLikes) => ({ ...prevLikes, [id]: res.data.likes }));
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? { ...post, likes: res.data.likes } : post))
      );
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await axios.delete(`${API_URL}/blogs/${id}`);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditMode(post._id);
    setEditData({ title: post.title, content: post.content });
  };

  const handleUpdate = async (id) => {
    await axios.put(`${API_URL}/blogs/${id}`, editData);
    fetchPosts();
    setEditMode(null);
  };

  const handleComment = async (id) => {
    if (!newComments[id]) return;
    try {
      await axios.post(`${API_URL}/blogs/${id}/comment`, {
        user: "Anonymous",
        text: newComments[id],
      });
      fetchPosts();
      setNewComments((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const toggleComments = (id) => {
    setShowComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Latest Blogs</h2>
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-lg-3 col-md-6 col-sm-12">
            <div className="card insta-card">
              {/* ✅ Handle Image Display */}
              {post.image && (
                <img
                  src={`${API_URL}${post.image}`}
                  className="card-img-top post-media"
                  alt="Blog"
                />
              )}
              
              {/* ✅ Handle Video Display */}
              {post.video && (
                <video className="card-img-top post-media" controls>
                  <source src={`${API_URL}${post.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              <div className="card-body">
                {editMode === post._id ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                    <textarea
                      className="form-control mb-2"
                      value={editData.content}
                      onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                    ></textarea>
                    <button className="btn btn-success" onClick={() => handleUpdate(post._id)}>
                      Save
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={() => setEditMode(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5>{post.title}</h5>
                    <p>{post.content}</p>
                    <button className="btn btn-outline-danger like-btn" onClick={() => handleLike(post._id)}>
                      <FaHeart /> {likes[post._id] || 0}
                    </button>
                    <button className="btn btn-outline-primary ms-2" onClick={() => toggleComments(post._id)}>
                      <FaComment /> {post.comments.length || 0}
                    </button>
                    <button className="btn btn-danger ms-2" onClick={() => handleDelete(post._id)}>
                      <FaTrash />
                    </button>
                    <button className="btn btn-warning ms-2" onClick={() => handleEdit(post)}>
                      <FaEdit />
                    </button>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment..."
                        value={newComments[post._id] || ""}
                        onChange={(e) =>
                          setNewComments((prev) => ({ ...prev, [post._id]: e.target.value }))
                        }
                      />
                      <button className="btn btn-primary mt-1" onClick={() => handleComment(post._id)}>
                        Comment
                      </button>
                    </div>
                    {showComments[post._id] && (
                      <div className="comments-section mt-2">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="comment">
                            <strong>{comment.user}: </strong> {comment.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
