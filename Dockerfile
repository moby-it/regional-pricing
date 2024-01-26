FROM node:20-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm ci --only=production


FROM build

ENV PORT=8080

COPY . .

EXPOSE ${PORT}
CMD exec node index.mjs