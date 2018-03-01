const fs = require(`fs`);
const log = require(`./log.js`);
const mysql = require(`mysql`);
const path = require(`path`);

const randQuestionQuery = `
SELECT * FROM open_questions
ORDER BY RAND()
LIMIT 10;
`;

const connectionConfig =
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: process.env.NODE_ENV === `local` ? {
            ca: fs.readFileSync(path.join(__dirname + `../../../secrets/sql-server-ca.pem`)),
            cert: fs.readFileSync(path.join(__dirname + `../../../secrets/sql-client-cert.pem`)),
            key: fs.readFileSync(path.join(__dirname + `../../../secrets/sql-client-key.pem`))
        } : undefined
    }

const database = {
    init: function () {
        database.connection = mysql.createConnection(connectionConfig);

        database.connection.connect((err) => {
            if (err) throw (err);
            log(
                `Database connection ` + database.connection.state
                + `: ` + connectionConfig.user
                + `@` + connectionConfig.host
            );
        });
    },
    disconnect: function () {
        return new Promise((resolve, reject) => {
            database.connection.end((err) => {
                if (err) reject(err);
                log(`Database disconnected.`);
                resolve();
            });
        });
    },
    query: function () {
        log(`Querying database...`);
        return new Promise((resolve, reject) => {
            database.connection.query(randQuestionQuery, function (error, results) {
                if (error) {
                    reject(error);
                }
                else {
                    log(`Database query successful.`);
                    resolve(results);
                }
            })
        });
    }
};

module.exports = database;