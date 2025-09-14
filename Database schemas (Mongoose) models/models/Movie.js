const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  genres: [{ type: String }],
  releaseYear: Number,
  director: String,
  cast: [String],
  synopsis: String,
  posterUrl: String,
  trailerUrl: String,
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// optionally a compound index for filters
movieSchema.index({ title: 'text', genres: 1, releaseYear: -1 });

module.exports = mongoose.model('Movie', movieSchema);
