FROM node:alpine

COPY _docker/run.sh /usr/local/bin/run
RUN chmod +x /usr/local/bin/run

WORKDIR /usr/src/app

COPY package.json yarn.* ./

RUN yarn install

COPY . ./

CMD ["run"]
