# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend ./backend
WORKDIR /app/backend
RUN npm install

# Copy frontend files and build them
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Serve frontend using static file server (e.g., serve)
RUN npm install -g serve

# Use backend as entrypoint (adjust if you use a framework)
WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "index.js"]
