
FROM node:10
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app

# Copies everything over to Docker environment
COPY . .

# Copies package.json and package-lock.json to Docker environment

# frontend
WORKDIR /usr/src/app/frontend
# Installs all node packages
RUN npm install

#backend
WORKDIR /usr/src/app/backend
# Installs all node packages
RUN npm install
RUN npm install concurrently --save -g


EXPOSE 3000
