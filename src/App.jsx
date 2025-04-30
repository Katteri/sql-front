import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage'
import Login from './components/Login';
import Register from './components/Register';
import Exercise from './components/Exercise';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercise" element={<Exercise />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;