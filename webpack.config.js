const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/ts/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ["node_modules", "./src/ts"],
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    }
}
