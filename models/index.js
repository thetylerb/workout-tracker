const exerciseModel = require('./exercise');

module.exports = {
    Exercise: exerciseModel.model,
    Workout: require('./workout')
    
};