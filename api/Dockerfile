FROM node:18-alpine as development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --no-cache openssh

RUN npm install

COPY . .

CMD ["npm", "start"]

# # ------------------------------------------------------------------------

FROM node:18-alpine as production

RUN npm install -g nodemon

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --no-cache openssh

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]