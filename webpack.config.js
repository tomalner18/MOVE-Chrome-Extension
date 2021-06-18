const path = require('path');

module.exports = [
    {
        entry: './src/more_exercises.js',
        output: {
            path: path.resolve(__dirname, 'src/bundles'),
            filename: 'more_exercises_bundle.js',
        }
    },

    {
        entry: './src/exercise.js',
        output: {
            path: path.resolve(__dirname, 'src/bundles'),
            filename: 'exercise_bundle.js',
        }
    },

    {
        entry: './src/break.js',
        output: {
            path: path.resolve(__dirname, 'src/bundles'),
            filename: 'break_bundle.js',
        }
    }

];