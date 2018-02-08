const fs = require(`fs`);

module.exports = {
    build: function () {
        if (!fs.existsSync(`./dist`)) {
            fs.mkdirSync(`./dist`);
        }

        fs.createReadStream(`./src/index.html`)
            .pipe(fs.createWriteStream(`./dist/index.html`));
        fs.createReadStream(`./src/media/favicon.ico`)
            .pipe(fs.createWriteStream(`./dist/favicon.ico`));

        console.log(`Building completed.`)
    }
};