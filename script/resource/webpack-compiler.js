const path = require(`path`);
const dotenvWebpack = require(`dotenv-webpack`);
const webpack = require(`webpack`);

module.exports = webpack({
    entry: `./src/app.js`,
    output: {
        path: path.join(__dirname, `../../dist`),
        filename: `app.bundle.js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                    options: {
                        presets: [`env`]
                    }
                }
            }
        ]
    },
    plugins: [
        new dotenvWebpack({
            path: path.join(__dirname, `../../secrets/.env`)
        })
    ]
});