import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import MainPage from './components/MainPage'
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import Achievements from './components/Achievements';
import Profile from './components/Profile';
import Tasks from './components/Tasks';
import Task from './components/Task';

import Navigation from './components/Navigation';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
          <Route element={<Navigation/>} >
            <Route path="/" element={<MainPage/>} />
            <Route element={<ProtectedRoutes/>} >
              <Route path="/achievements" element={<Achievements/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/missions" element={<Tasks/>} />
              <Route path="/missions/:missionID/task/:taskID" element={<Task />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;