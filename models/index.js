const exerciseModule= require("./Exercise")

module.exports = {
  Exercise: exerciseModule.model,
  Workout: require("./workout")
};