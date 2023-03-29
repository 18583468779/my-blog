FROM node:16
# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
# COPY yarn.lock ./
# RUN yarn install
RUN npm install
COPY . .
EXPOSE 3000
# CMD [ "yarn", "start" ]
CMD [ "npm", "start" ]