# Set the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and .npmrc
COPY .npmrc package*.json ./

# Install dependencies
RUN npm install

# Remove .npmrc file after installation
RUN rm -f .npmrc

# Copy the rest of the application code
COPY . .

# Build the Typescript project
RUN npm run build

# Expose the port
EXPOSE 8080

# Your start command
CMD [ "node", "dist/index.js" ]
