const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const auth = require('../middlewares/auth');

// GET /api/movies?search=&genre=&year=&rating=&page=&limit=
router.get('/', async (req, res, next) => {
  try {
    const { page=1, limit=12, genre, year, rating, search } = req.query;
    const filter = {};
    if (genre) filter.genres = genre;
    if (year) filter.releaseYear = parseInt(year);
    if (search) filter.$text = { $search: search };

    // rating filter: movies with averageRating >= rating
    if (rating) filter.averageRating = { $gte: Number(rating) };

    const movies = await Movie.find(filter)
      .skip((page-1)*limit)
      .limit(Number(limit))
      .sort({ releaseYear: -1 });

    const total = await Movie.countDocuments(filter);
    res.json({ data: movies, page: Number(page), total });
  } catch (err) { next(err); }
});

// GET /api/movies/:id (with reviews)
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Not found' });
    const reviews = await Review.find({ movie: movie._id }).populate('user', 'username profilePicture');
    res.json({ movie, reviews });
  } catch (err) { next(err); }
});

// POST /api/movies/:id/reviews
router.post('/:id/reviews', auth, async (req, res, next) => {
  const { rating, text } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    // check if user already reviewed (optional)
    const existing = await Review.findOne({ user: req.user.id, movie: movie._id });
    if (existing) return res.status(400).json({ message: 'You already reviewed this movie' });

    const review = await Review.create({ user: req.user.id, movie: movie._id, rating, text });
    // update movie average
    movie.reviewCount = movie.reviewCount + 1;
    movie.averageRating = ((movie.averageRating * (movie.reviewCount - 1)) + rating) / movie.reviewCount;
    await movie.save();

    res.status(201).json(review);
  } catch (err) { next(err); }
});

module.exports = router;
