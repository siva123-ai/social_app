import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';

const App = () => {
  const { auth } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={auth.token ? <Navigate to="/home" /> : <AuthPage />}
        />
        <Route
          path="/home"
          element={auth.token ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
