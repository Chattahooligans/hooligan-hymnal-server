FROM node:10.16.3
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
RUN npm install -g nodemon
CMD [ "nodemon", "app.js" ]
