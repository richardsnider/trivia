const database = require(`./database.js`);
const log = require(`./log.js`);
const socketIO = require(`socket.io`);

module.exports = {
    init: function (httpServer) {
        this.socketIOServer = socketIO(httpServer);
        
        this.socketIOServer.on(`connection`, function (socket) {
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
    }
};