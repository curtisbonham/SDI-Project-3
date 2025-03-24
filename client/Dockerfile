# Use the official Node.js image as a base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /src/app

# Copy only package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . ./

# Expose the app port (usually for frontend apps)
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]
