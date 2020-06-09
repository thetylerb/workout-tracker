const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exerciseModel = require('./exercise')

const workoutSchema = new Schema({
    day: Date,
    exercises: [exerciseModel.Schema]
});



const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;