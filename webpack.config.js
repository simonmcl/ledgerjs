const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        "ledgerjs": ['./packages/hw-app-tezos', './packages/hw-transport', './packages/react-native-hw-transport-ble', './packages/errors', './packages/devices']
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules'],
        fallback: { 
            "stream": require.resolve("stream-browserify") 
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: ['[name]'],
        libraryTarget: "var"
    },
    plugins: [
        new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
    ]
};
