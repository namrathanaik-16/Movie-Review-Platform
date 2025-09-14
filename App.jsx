import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import MoviesList from './pages/MoviesList';
import MovieDetail from './pages/MovieDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movies" element={<MoviesList/>}/>
          <Route path="/movies/:id" element={<MovieDetail/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
