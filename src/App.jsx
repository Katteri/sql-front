import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './components/context/AuthContext';
import MainPage from './components/MainPage'
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import Achievements from './components/Achievements';
import Profile from './components/Profile';
import Tasks from './components/Tasks';
import Task from './components/Task';
import Quest from './components/Quest';

import Navigation from './components/Navigation';
import MobileBlock from './components/utils/MobileBlock';

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const App = () => {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (isMobile()) {
      setBlocked(true);
    }
  }, []);

  if (blocked) return <MobileBlock />;

  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Toaster
          position="top-right"
          containerStyle={{
            top: '4vw',
          }}
        />
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
              <Route path="/quest" element={<Quest />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;