import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as api from './api';
import Profile from './components/Profile';
import Header from './components/Header';
import Nav from './components/Nav';
import Index from './components/Index';
import Home from './components/Home';
import CreateAPost from './components/CreateAPost';
import Error404 from './components/Error404';

function App() {
  const [ users, setUsers ] = useState( [] );

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Index users={users} setUsers={setUsers}/>}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-a-post" element={<CreateAPost />}/>
        <Route path="/*" element={<Error404 />}/>
      </Routes>
    </div>
  );
}

export default App;
