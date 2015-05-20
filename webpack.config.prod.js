var path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.min.js',
    },
    eslint: {
        configFile: './.eslintrc',
    },
    resolve: {
        root: path.resolve(__dirname),
    },
};
