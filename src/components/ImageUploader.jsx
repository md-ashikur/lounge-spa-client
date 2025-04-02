"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageUploader() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [category, setCategory] = useState("gallery");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function handleUpload() {
    if (!selectedFile) {
      alert("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("category", category); // Send selected category

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Image uploaded successfully!");
        fetchImage(data.id); // Fetch the latest image
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("An error occurred while uploading.");
    }
  }

  async function fetchImage(id) {
    // const response = await fetch(`/api/getImage?id=${id}`);
    const data = await response.json();

    if (response.ok) {
      setUploadedImage(data.path);
      console.log(data.path);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  }

  return (
    <div>
      <h2>Upload an Image</h2>

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="gallery">Gallery</option>
        <option value="spa">Spa Icon</option>
        <option value="catering">Catering Icon</option>
        <option value="souvenirs">Souvenirs Icon</option>
        <option value="logements">Logements Icon</option>
        <option value="activities">Activities Icon</option>
      </select>

      <input type="file" onChange={handleFileChange} />

      <button
        onClick={handleUpload}
        style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
      >
        Upload
      </button>

      {message && (
        <p style={{ color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </p>
      )}

      {uploadedImage && (
        <Image
          src={uploadedImage}
          alt="Uploaded"
          width={200}
          height={200}
          unoptimized
        />
      )}
    </div>
  );
}
