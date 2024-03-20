FROM node:18-slim

# Set the working directory
WORKDIR /todo-app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

CMD ["node", "server.js"]
