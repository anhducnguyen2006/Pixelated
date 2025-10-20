FROM node:20-alpine AS app
WORKDIR /app

ENV PORT=3000

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./

# CRA dev server
EXPOSE 3000

CMD ["npm", "start"]
