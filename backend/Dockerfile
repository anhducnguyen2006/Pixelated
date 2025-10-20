FROM node:20-bookworm-slim AS server
WORKDIR /app

# Install system deps for Python Pillow and health checks
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 python3-pip curl \
      build-essential \
      libjpeg-dev zlib1g-dev \
      libpng-dev && \
    rm -rf /var/lib/apt/lists/*

# Install backend Node dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Copy Python requirements and install
COPY requirements.txt ./requirements.txt
RUN python3 -m pip install --no-cache-dir --upgrade pip --break-system-packages || true && \
  python3 -m pip install --no-cache-dir --break-system-packages -r requirements.txt

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
