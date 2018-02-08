const connect = require(`connect`);
const path = require(`path`);
const serveStatic = require(`serve-static`);
const database = require(`./database.js`)
const websocketServer = require(`./websocket-server.js`);

module.exports = {
  start: function () {
    database.init();

    this.instance = connect()
      .use(serveStatic(path.join(__dirname, `../../dist`)))
      .listen(process.env.HTTP_PORT, function () {
        console.log(`HTTP Server running on port: ` + process.env.HTTP_PORT);
      });

    websocketServer.init(this.instance);
  },
  close: function (callback) {
    database.disconnect();
    return this.instance.close()
  }
};