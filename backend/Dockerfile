COPY .env .env

# --- Stage 1: Build Stage ---
    FROM node:22.13.0-alpine AS builder

    # Set working directory inside container
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package.json package-lock.json ./
    RUN npm install --only=production
    
    # Copy backend source code
    COPY . .
    
    # If using Prisma, generate client
    RUN npx prisma generate || echo "Prisma not configured"
    
    # --- Stage 2: Production Stage ---
    FROM node:22.13.0-alpine
    
    WORKDIR /app
    
    # Copy built app and dependencies from builder
    COPY --from=builder /app /app
    
    # Expose port
    EXPOSE 5000
    
    # Start the backend server
    CMD ["npm", "run", "start"]
    