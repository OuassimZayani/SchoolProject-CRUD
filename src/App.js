import React, { useState, useEffect } from 'react';
import "./app.css"
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Modules from "./pages/modules/Modules";
import Classes from "./pages/classes/Classes";
import Exams from "./pages/exams/Exams";
import Results from "./pages/results/Results";
import Absences from "./pages/absences/Absences";
import Events from "./pages/events/Events";


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Spin } from 'antd';

import { useAuth } from './AuthContext'; // Import the useAuth hook

function App() {
  const { user } = useAuth(); // Access the user state from the authentication context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is set from local storage
    if (user === null && localStorage.getItem('user')) {
      setLoading(true); // Set loading state to true
      // Simulate async operation with setTimeout
      setTimeout(() => {
        setLoading(false); // Set loading state to false
      }, 20000);
    } else {
      setLoading(false); // Set loading state to false
    }
  }, [user]);

  // Render loading indicator if loading
  if (loading) {
    return <div className='loaderContainer'> <Spin /> </div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" replace />} />
          <Route path="/modules" element={user ? <Modules /> : <Navigate to="/" replace />} />
          <Route path="/classes" element={user ? <Classes /> : <Navigate to="/" replace />} />
          <Route path="/exams" element={user ? <Exams /> : <Navigate to="/" replace />} />
          <Route path="/results" element={user ? <Results /> : <Navigate to="/" replace />} />
          <Route path="/absences" element={user ? <Absences /> : <Navigate to="/" replace />} />
          <Route path="/events" element={user ? <Events /> : <Navigate to="/" replace />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
