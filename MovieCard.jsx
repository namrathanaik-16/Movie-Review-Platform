import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="card">
      <img src={movie.posterUrl} alt={movie.title} />
      <div className="card-body">
        <h3>{movie.title} ({movie.releaseYear})</h3>
        <p>⭐ {movie.averageRating?.toFixed(1)} · {movie.reviewCount} reviews</p>
        <Link to={`/movies/${movie._id}`}>View</Link>
      </div>
    </div>
  );
}
