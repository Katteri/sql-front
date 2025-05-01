import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage'
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Exercise from './components/Exercise';

import Navigation from './components/Navigation';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation /> } >
          <Route path="/" element={<MainPage/> } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exercise" element={<Exercise />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;