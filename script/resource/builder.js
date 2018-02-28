const fs = require(`fs`);
const log = require(`./log.js`);

module.exports = {
    build: function () {
        if (!fs.existsSync(`./dist`)) {
            fs.mkdirSync(`./dist`);
        }

        fs.createReadStream(`./src/index.html`)
            .pipe(fs.createWriteStream(`./dist/index.html`));
        fs.createReadStream(`./src/media/favicon.ico`)
            .pipe(fs.createWriteStream(`./dist/favicon.ico`));
        fs.createReadStream(`./src/stylesheet.css`)
            .pipe(fs.createWriteStream(`./dist/stylesheet.css`));

        log(`Building completed.`);
    }
};