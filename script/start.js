require(`dotenv`).config();
const moment = require(`moment`);
const server = require(`./resource/server.js`);
const builder = require(`./resource/builder.js`);
const webpackCompiler = require(`./resource/webpack-compiler.js`);

builder.build();

const watcher = webpackCompiler.watch({
    ignored: [/node_modules/, /dist/],
    poll: 1000
}, (err, stats) => {
    console.log(moment().format(`M/D/YY HH:mm:ss`) + ` Changes detected!`);
    if (server.instance) {
        console.log(`Closing server.`);
        server.close();
    }
    console.log(`Starting server.`);
    server.start();
});

process.on(`SIGINT`, () => {
    console.log(`Closing server...`)
    watcher.close(() => { console.log(`Watching Ended.`); });
  
    server.close(() => {
      console.log(`Server closed.`)
      process.exit()
    })
  
    setTimeout((e) => {
      console.log(`Forcing server close !!!`, e)
      process.exit(1)
    }, 5000)
  })