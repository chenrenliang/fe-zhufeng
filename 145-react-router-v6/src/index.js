import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
  <Router>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/user">User</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);