const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models')
const PORT = process.env.PORT || 3001;
const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workouts', {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.get('/exercise', function(req, res) {
    res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', function(req, res) {
    res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/api/workouts', (req, res) => {
    db.Workout.find({}).then(Workout => {
        res.json(Workout);
    }).catch(error => {
        res.json(error);
    });
});

app.get('/api/wourkouts/:id', (req, res) => {
    db.Workout.findOne({_id: req.params.id}).then(Workout => {
        res.json(Workout);
    }).catch(error => {
        res.json(error)
    })
})

app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({}).then(Workout => {
        res.json(Workout);
    }).catch(error => {
        res.json(error);
    });
});

app.post("/api/workouts", ({ body }, res)=> {
    body.day = new Date(),
    body.exercises = []
    db.Workout.create(body).then(Workout => {
        res.json(Workout);
    }).catch(error => {
        res.json(error);
    });
});

app.put('api/workouts/:id', (req, res) => {
    let data = req.body;
    db.Workout.update(
        {_id: req.params.id},
        {$push: { exercises: data }},
        (error, response) => {
            res.json(response);
        }
    )
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});