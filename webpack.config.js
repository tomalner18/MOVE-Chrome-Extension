const path = require('path');

module.exports = [
    {
        entry: './src/more_exercises.js',
        output: {
            path: path.resolve(__dirname, 'src'),
            filename: 'more_exercises_build.js',
        }
    },

    {
        entry: './src/exercise.js',
        output: {
            path: path.resolve(__dirname, 'src'),
            filename: 'exercise_build.js',
        }
    }

];