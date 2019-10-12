FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY src/*.json ./
RUN mkdir /app/db
COPY src/db/* ./db/
COPY src/*.js ./
COPY src/*.js ./
COPY src/*.js ./
COPY src/*.js ./
RUN npm ci --only=production
EXPOSE 80 443
CMD [ "npm", "start" ]