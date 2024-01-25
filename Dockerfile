FROM node:20-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm ci --only=production 

FROM build as litefs

RUN apk add ca-certificates fuse3 sqlite

FROM litefs

ENV PORT=8080

COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs

COPY . .
EXPOSE ${PORT}
ENTRYPOINT litefs mount