FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

RUN chown -R 1000:1000 /usr/src/app

USER 1000:1000
# A wildcard is used to ensure both package.json AND package-lock.json are copied
ADD package*.json ./

# Install app dependencies
RUN npm ci

COPY --chown=1000:1000 . .
    
RUN npm run build
    
# Start the server 
CMD [ "node", "dist/main.js" ]
