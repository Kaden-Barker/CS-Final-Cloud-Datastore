FROM node:18-alpine

# Set the working directory
WORKDIR /todo-app

# Copy package.json and package-lock.json
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files
COPY . .

# Build the React app
RUN npm run build

CMD ["npm", "start"]
