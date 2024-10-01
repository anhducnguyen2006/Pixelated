const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));


// Set up file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, 'input.png');
    }
});
const upload = multer({ storage: storage });

// Route to handle image upload and pixelation
app.post('/upload', upload.single('image'), (req, res) => {
    const pixelSize = req.body.pixelSize || 10; // Default pixel size if not provided
    //console.log("RECEIVED!");
    // Spawn Python process to pixelate the image
    const pythonProcess = spawn('python3', ['-u', 'app.py', pixelSize]);
    //pythonProcess.stdout.on('data', (data) => {
      //  console.log(`stdout: ${data}`);
    //});
    
    //pythonProcess.stderr.on('data', (data) => {
      //  console.error(`stderr: ${data}`);
    //});
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            const outputUrl = `http://localhost:5000/uploads/output.png`;
            res.json({ imageUrl: outputUrl }); 
        } else {
            res.status(500).send("Image processing failed");
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});