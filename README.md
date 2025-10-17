# **Pixelated Image-Generator**

Welcome to my Mini Project's page! It's Anh Duc Nguyen here.

The website's aim is to return a pixelated version of the image that the user has uploaded :)

Have fun during your stay here!

1. Install Python dependency (for image processing):

  `pip install -r requirements.txt`

1. Start the backend API (port 5000 by default):

- Open a terminal in `backend/`
- Install Node deps once: `npm install`
- Start server: `npm start`

 The backend will:

- Accept uploads at `POST http://localhost:5000/upload`
- Save files under `backend/uploads`
- Call `app.py` to pixelate the image using Pillow

1. Start the React frontend (port 3000):

- Open another terminal in `frontend/`
- Install Node deps once: `npm install`
- Start dev server: `npm start`

1. Open the app at [http://localhost:3000](http://localhost:3000)

The page will reload when you make changes. You may also see any lint errors in the console.

## Troubleshooting

## Port 5000 already in use

[https://stackoverflow.com/questions/52468827/port-5000-in-use-constantly]

`kill -9 PID`

Or start the backend on a different port and point the frontend to it:

- In a new terminal:

  - `cd backend`
  - `PORT=5050 npm start`

- In another terminal, set the frontend to use that API base:

  - `cd frontend`
  - `REACT_APP_API_BASE_URL=http://localhost:5050 npm start`

## **If using Mac:**

[https://medium.com/pythonistas/port-5000-already-in-use-macos-monterey-issue-d86b02edd36c]

## Python not found

If the backend logs show an error spawning `python3`, ensure Python 3 is installed and available on PATH. On macOS you can install via Homebrew and verify:

- `brew install python`
- `python3 --version`

## Pillow errors

If you see errors in `app.py`, reinstall dependencies from project root:

- `pip install -r requirements.txt`
