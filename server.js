const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");


const PORT = process.env.PORT || 3011;



const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workouts";
// mongoose.connect(MONGODB_URI);

// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
}) 

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
})


app.get("/api/workouts/range" ,(req, res) => {
  db.Workout.find(
  ).limit(7)
  .then(Workout => {
    res.json(Workout)
  })
  .catch(err => {
    res.json(err);
  });
})

app.get("/api/workouts/:id", (req, res) => {
  db.Workout.findOne({_id: req.params.id})
  .then(Workout =>  {
    res.json(Workout)
  })
  .catch(err => {
    res.json(err);
  });
})

app.get("/api/workouts" , (req, res) => {
  db.Workout.find({})
  .then(Workout => {
    res.json(Workout)
  })
  .catch(err => {
    res.json(err);
  })
})

app.post("/api/workouts", ({ body }, res) => {
  body.day = new Date(),
  body.exercises = []
  db.Workout.create(body)
    .then(Workout => {
      res.json(Workout)
    }).catch(err => {
      res.json(err)
    })
})

app.put("/api/workouts/:id", (req, res) => {
  const addedExercise = req.body;
  db.Workout.update(
    {_id: req.params.id},
    { $push: { exercises: addedExercise }},
    (err, data) => {
      res.json(data);
  })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});