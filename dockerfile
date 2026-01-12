# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & lock file first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build Nuxt for production
RUN npm run build

# Expose port Nuxt will listen on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
