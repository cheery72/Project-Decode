FROM node:alpine
ENV PORT 3000
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./ ./
RUN npm install

COPY ./ ./
ENV NODE_ENV production

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]