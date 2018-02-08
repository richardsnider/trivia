const socketIO = require(`socket.io`);
const database = require(`./database.js`);

module.exports = {
    init: function (httpServer) {
        this.socketIOServer = socketIO(httpServer);
        
        this.socketIOServer.on(`connection`, function (socket) {
            console.log(`Connection established...`)

            socket.emit(`announcements`,
                { message: `Websocket server connected.` }
            );

            socket.on(`question`, function (data) {
                database.query().then(function (result) {
                    socket.emit(`question`, result);
                });
            });

            socket.on(`disconnect`, function () {
                console.log(`Disconnected...`);
            });
        });
    }
};