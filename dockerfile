# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build Nuxt for production with NODE_ENV set and timeout
RUN NODE_ENV=production timeout 300 npm run build || true

# Expose port
EXPOSE 3000

# Start Nuxt in production mode
CMD ["node", ".output/server/index.mjs"]
