const fs = require(`fs`);
const mysql = require(`mysql`);

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
            ca: fs.readFileSync(__dirname + `/server-ca.pem`),
            cert: fs.readFileSync(__dirname + `/client-cert.pem`),
            key: fs.readFileSync(__dirname + `/client-key.pem`)
        } : undefined
}


module.exports = {
    init: function () {
        this.connection = mysql.createConnection(connectionConfig);

        this.connection.connect(function (err) {
            if (err) throw (err);
        });
    },
    disconnect: function () {
        console.log(`Closing database connection...`);
        this.connection.end();
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