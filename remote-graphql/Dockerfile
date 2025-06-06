FROM node:23.6.0

WORKDIR /app

# Install deps first to cache layer
COPY package*.json ./
RUN npm install


