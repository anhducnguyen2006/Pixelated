const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Resolve absolute paths relative to this file, not the working directory
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PY_APP = path.join(__dirname, 'app.py');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use('/uploads', express.static(UPLOADS_DIR));


// Set up file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, 'input.png');
    }
});
const upload = multer({ storage: storage });

// Simple health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Route to handle image upload and pixelation
app.post('/upload', upload.single('image'), (req, res) => {
    const pixelSize = parseInt(req.body.pixelSize, 10) || 10; // Default pixel size if not provided
    //console.log("RECEIVED!");
    // Spawn Python process to pixelate the image
        const pythonProcess = spawn('python3', ['-u', PY_APP, String(pixelSize)], {
        cwd: __dirname,
    });
        pythonProcess.stdout.on('data', (data) => {
                console.log(`[python stdout] ${data}`);
        });
    
        pythonProcess.stderr.on('data', (data) => {
                console.error(`[python stderr] ${data}`);
        });
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            const outputUrl = `http://localhost:${PORT}/uploads/output.png`;
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