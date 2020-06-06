const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exerciseModel = require('./exercise')

const workoutSchema = new Schema({
    day: Date,
    exercises: [exerciseModel.Schema]
});

// workoutSchema.virtual('totalDuration').get(function() {
//     return this.exercises.reduce((total, exercises) => {
//         return total + exercises.duration;
//     }, 0);
// });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;