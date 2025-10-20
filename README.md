# Pixelated Image Generator

Transform images into retro pixel art with a React UI, a Node/Express API, and a Python (Pillow) worker.

## Features

- React UI with slider-controlled pixel size and instant preview/download
- Node/Express API with Multer upload, CORS, and static file serving
- Python Pillow worker (spawned via child_process) for pixelation
- One-command dev runner and Dockerized stack

## Architecture

- Frontend (React, CRA): sends `multipart/form-data` to the API and displays the processed image
- Backend (Node/Express): receives the image, stores it in `uploads/`, spawns Python to process, serves `/uploads/output.png`
- Worker (Python, Pillow): downscales and upscales using `Image.NEAREST` to produce a crisp pixel effect

```text
React (port 3001) ──HTTP──> Express (port 5050) ──spawn──> Python (Pillow)
                                    │
                                    └──── serves /uploads/output.png
```

## Quick Start (local)

From the repo root:

```bash
npm install
npm run setup
npm run dev
```

Defaults: backend <http://localhost:5050>, frontend <http://localhost:3001>

Environment variables:

- `BACKEND_PORT` (default 5050)
- `FRONTEND_PORT` (default 3001)
- `REACT_APP_API_BASE_URL` (frontend API target; auto-set by root scripts)

## Quick Start (Docker)

```bash
docker compose up -d --build
```

Open <http://localhost:3001>

Logs:

```bash
docker compose logs -f --tail=100
```

Env file example: see `.env.example`.

## API

- `POST /upload`
  - form-data: `image` (file), `pixelSize` (int, default 10)
  - returns: `{ imageUrl: string }`
- `GET /health` → `{ status: 'ok' }`

## Troubleshooting

- Port conflicts (macOS Control Center often uses :5000): use `BACKEND_PORT=5050`.
- Python not found locally: install Python 3 (`brew install python`) then `pip install -r requirements.txt`.
- Docker build errors for Pillow: the backend Dockerfile installs the needed libs; rebuild with `docker compose build backend`.

## License

MIT © Anh Duc Nguyen
