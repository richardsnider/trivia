const moment = require(`moment`);

module.exports = function (text) {
    console.log(moment().format(`M/D/YY HH:mm:ss`) + ` ` + text);
}