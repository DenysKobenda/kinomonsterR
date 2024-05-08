const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./bd"); // Виправлений шлях імпорту
const appealRouter = require("./appeal-router");
const app = express();
const port = 3000;

// Переміщення імпорту моделі Movie після підключення до бази даних
connectDB();
const Movie = require('./models/movie');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public')));
app.use('/assets', express.static(path.join(__dirname, 'Public', 'assets')));
app.use("/api", appealRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// Виправлений імпорт моделі Movie
app.post('/api/movies', async (req, res) => {
    const { title, genre, year, rating } = req.body;

    const newMovie = new Movie({
        title,
        genre,
        year,
        rating
    });

    try {
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find({}, '-__v');
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

