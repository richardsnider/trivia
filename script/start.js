require(`dotenv`).config({
    path: require(`path`).join(__dirname, `../secrets/.env`)
});

const builder = require(`./resource/builder.js`);
const log = require(`./resource/log.js`);
const moment = require(`moment`);
const server = require(`./resource/server.js`);
const webpackCompiler = require(`./resource/webpack-compiler.js`);

builder.build();

if (process.env.NODE_ENV !== `local`) {
    webpackCompiler.run(function (err, stats) {
        if (err) throw err;
        server.start()
    });
}
else {
    const watcher = webpackCompiler.watch({
        ignored: [/node_modules/, /dist/],
        poll: 1000
    }, (err, stats) => {
        log(`Changes detected.`);
        if (server.instance) {
            log(`Closing server.`);
            server.close();
        }
        log(`Starting server.`);
        server.start();
    });
    log(`Watcher started.`);

    process.on(`SIGINT`, () => {
        log(`Closing server...`);
        watcher.close(() => { log(`Watcher ended.`); });

        server.close(() => {
            log(`Server closed.`);
            process.exit()
        })

        setTimeout((e) => {
            log(`Forcing server close!`, e);
            process.exit(1)
        }, 5000)
    })
}