const connect = require(`connect`);
const database = require(`./database.js`);
const log = require(`./log.js`);
const path = require(`path`);
const serveStatic = require(`serve-static`);
const websocketHandler = require(`./websocket-server.js`);

const server = {
  start: function () {
    database.init();

    server.httpServer = connect()
      .use(serveStatic(path.join(__dirname, `../../dist`)))
      .listen(process.env.HTTP_PORT, function () {
        log(`HTTP Server running on port: ` + process.env.HTTP_PORT);
      });

    websocketHandler.init(server.httpServer);
  },
  close: function () {
    database.disconnect();
    websocketHandler.close();
    server.httpServer.close();
    log(`Server closed.`);
    process.exit()
  }
};

module.exports = server;