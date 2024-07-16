// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import { AuthProvider } from './Context/Auth';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </Router>
    );
};

const AppWrapper: React.FC = () => {
    return (
      <AuthProvider>
        <App />
      </AuthProvider>
    );
  };

export default AppWrapper;
