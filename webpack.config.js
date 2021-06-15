const path = require('path');

module.exports = {
    entry: './src/exercise.js',
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'main.js',
    }
};
  