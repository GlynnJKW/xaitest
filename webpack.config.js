const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        xai: './src/build/XAI.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};