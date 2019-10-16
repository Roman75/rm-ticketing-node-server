FROM node:lts-alpine
ADD VERSION .
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production
COPY src/ ./
EXPOSE 8080
CMD [ "npm", "start" ]
