const express = require("express");
const Movie = require("./models/movie");
const router = express.Router();

// GET all movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific movie
router.get("/:id", getMovie, (req, res) => {
    res.json(res.movie);
});

// CREATE a new movie
router.post("/", async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        rating: req.body.rating,
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a movie
router.patch("/:id", getMovie, async (req, res) => {
    if (req.body.title != null) {
        res.movie.title = req.body.title;
    }
    if (req.body.genre != null) {
        res.movie.genre = req.body.genre;
    }
    if (req.body.year != null) {
        res.movie.year = req.body.year;
    }
    if (req.body.rating != null) {
        res.movie.rating = req.body.rating;
    }

    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a movie
router.delete("/:id", getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single movie
async function getMovie(req, res, next) {
    let movie;
    try {
        movie = await Movie.findById(req.params.id);
        if (movie == null) {
            return res.status(404).json({ message: "Cannot find movie" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.movie = movie;
    next();
}

module.exports = router;