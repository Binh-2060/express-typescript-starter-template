FROM node:20-alpine3.18 AS builder

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install --frozen-lockfile

COPY . . 

RUN yarn build 

FROM node:20-alpine3.18 AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock

CMD [ "yarn" , "start" ]

