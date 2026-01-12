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

# Build Nuxt for production
RUN npm run build

# Expose port
EXPOSE 3000

# Start Nuxt in production mode
CMD ["node", ".output/server/index.mjs"]
