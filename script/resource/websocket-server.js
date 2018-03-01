const database = require(`./database.js`);
const log = require(`./log.js`);
const map = require(`lodash.map`);
const socketIO = require(`socket.io`);

const websocketHandler = {
    init: function (httpServer) {
        websocketHandler.socketIOServer = socketIO(httpServer);

        websocketHandler.socketIOServer.on(`connection`, function (socket) {
            log(`Connection established to ` + socket.handshake.address + `, socket ` + socket.id);

            socket.emit(`announcements`,
                { message: `Websocket server connected.` }
            );

            socket.on(`question`, function (data) {
                database.query().then(function (result) {
                    socket.emit(`question`, result);
                });
            });

            socket.on(`disconnect`, function () {
                log(`Disconnected from ` + socket.handshake.address + `, socket ` + socket.id);
            });
        });
    },
    close: function () {
        return new Promise(function (resolve, reject) {
            map(websocketHandler.socketIOServer.nsps['/'].sockets, function (value) {
                value.disconnect(true);
            });

            websocketHandler.socketIOServer.close(function (err) {
                if (err) reject(err);
                log(`Websocket server closed.`);
                resolve(true);
            });
        });
    }
};

module.exports = websocketHandler;