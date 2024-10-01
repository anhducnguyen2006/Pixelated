import React, { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // State to store file name
  const [pixelatedImage, setPixelatedImage] = useState(null);
  const [pixelSize, setPixelSize] = useState(10);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Update file name state
    }
  };

  const handlePixelSizeChange = (event) => {
    setPixelSize(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('pixelSize', pixelSize);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const newImageUrl = response.data.imageUrl + '?t=' + new Date().getTime();
      setPixelatedImage(newImageUrl); 

      setFile(null);
      setFileName(''); // Clear the file name after submission
      //setPixelSize(10);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input field
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("Error processing the image. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Pixelated Image Generator</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose Image
          </label>
          <input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {fileName && <p className="file-name">Selected File: {fileName}</p>} {/* Display file name */}
          
          <div>
            <label htmlFor="pixelSize">Pixel Size: {pixelSize}</label>
            <input
              type="range"
              id="pixelSize"
              name="pixelSize"
              min="2"
              max="50"
              value={pixelSize}
              onChange={handlePixelSizeChange}
            />
          </div>
          <button type="submit">Pixelate Image</button>
        </form>

        {pixelatedImage && (
          <div className="image-container">
            <h2>Your Pixelated Image:</h2>
            <img src={pixelatedImage} alt="Pixelated" />
            <a href={pixelatedImage} download="pixelated_image.png" target="_blank" rel="noopener noreferrer">
              <button className="download-button">Download Image</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
