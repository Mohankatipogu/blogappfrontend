import React, { useState } from "react";

function AddPost() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("myfile", selectedFile);

    try {
      const response = await fetch("http://localhost:5002/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${await response.text()}`);
      }

      const result = await response.json();
      alert("✅ File uploaded successfully!");
      console.log("📌 Server Response:", result);
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div className="container" style={{ width: "300px", marginTop: "5%" }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*,video/mp4" required />
        <button type="submit" className="btn btn-primary">Add File</button>
      </form>
    </div>
  );
}

export default AddPost;
