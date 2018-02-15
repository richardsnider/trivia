const fs = require(`fs`);
const mysql = require(`mysql`);
const path = require(`path`);

const randQuestionQuery = `
SELECT * FROM open_questions
ORDER BY RAND()
LIMIT 10;
`;

let connectionConfig =
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

module.exports = {
    init: function () {
        this.connection = mysql.createConnection(connectionConfig);

        this.connection.connect((err) => {
            if (err) throw (err);
            console.log(
                `DB connection is ` + this.connection.state
                + `: ` + connectionConfig.user
                + `@` + connectionConfig.host
            );
        });
    },
    disconnect: function () {
        this.connection.end((err) => {
            if (err) throw (err);
            console.log(`DB disconnected`);
        });
    },
    query: function () {
        console.log(`Querying database...`)
        return new Promise((resolve, reject) => {
            this.connection.query(randQuestionQuery, function (error, results) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            })
        });
    }
};