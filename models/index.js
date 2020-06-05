const exerciseModel = require('./exercise');

module.exports = {
    Workout: require('./workout'),
    Exercise: exerciseModel.model
}