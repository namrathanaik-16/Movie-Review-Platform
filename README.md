# Movie Review Platform

## Overview
A movie review platform built with React (Vite) frontend and Node.js/Express backend with MongoDB.

## Features
- Browse movies, search & filter
- Movie detail pages with reviews, trailers, cast
- Submit reviews with star rating
- User auth (JWT), profile & watchlist
- Pagination & basic error handling

## Tech
Frontend: React + Vite, React Router, Tailwind (recommended), Axios  
Backend: Node.js, Express, MongoDB (Mongoose)  
Auth: JWT, bcrypt

## Setup

### Backend
1. `cd backend`
2. Create `.env`:
3. PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

3. Install & run:


npm install
npm run dev # nodemon


### Frontend
1. `cd frontend`
2. Create `.env`:


VITE_API_URL=http://localhost:5000/api

3. Install & run:


npm install
npm run dev


## API docs
(briefly list endpoints — see the API docs section in the repository)

## Environment variables
- `MONGO_URI` (backend)
- `JWT_SECRET` (backend)
- `VITE_API_URL` (frontend)

## Notes & design decisions
- Average rating stored on Movie for fast reads (kept in sync on review create/delete)
- Use pagination to limit payload size
- Input validation on both client and server
- For production, use HTTPS, set cookie options, secure JWT storage

## Deployment
- Build frontend and host (Vercel/Netlify)
- Host backend on Heroku/Render and connect to MongoDB Atlas

