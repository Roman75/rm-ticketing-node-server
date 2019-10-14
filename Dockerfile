FROM node:lts-alpine
ADD VERSION .
RUN mkdir /node
RUN mkdir /node/app
WORKDIR /node
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production
COPY src/ ./app/
EXPOSE 8080
CMD [ "npm", "start" ]
