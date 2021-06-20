const path = require('path');

module.exports = [
    {
        entry: './src/break.js',
        output: {
            path: path.resolve(__dirname, 'src/bundles'),
            filename: 'break_bundle.js',
        }
    }

];