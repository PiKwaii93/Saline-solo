FROM node:18-alpine as development

ENV WATCHPACK_POLLING=true

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]

# # ------------------------------------------------------------------------

FROM node:18-alpine as production

RUN echo hello

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build --production

RUN npm install -g serve

# Start the web server
ENTRYPOINT ["serve", "-s", "build"]