FROM index.docker.io/node:9.5.0-alpine
RUN apk update

# Make Docker use existing cached layer unless package.json is changed.
WORKDIR /tmp
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN npm install
RUN cp -a node_modules /home/node/node_modules

WORKDIR /home/node
ADD package.json .
ADD script ./script
ADD src ./src

EXPOSE 80
ENTRYPOINT ["npm", "start"]