import React, { createContext, useEffect, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    // optional: fetch profile
    api.get('/users/me').then(res => {
      setUser(res.data);
    }).catch(()=> {
      localStorage.removeItem('token');
    }).finally(()=>setLoading(false));
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    return api.get('/users/me').then(res => setUser(res.data));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
}
