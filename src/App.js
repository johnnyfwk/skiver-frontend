import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Header from './components/Header';
import Nav from './components/Nav';
import Index from './components/Index';
import Home from './components/Home';
import CreateAPost from './components/CreateAPost';
import SinglePost from './components/SinglePost';
import Footer from './components/Footer';
import Error404 from './components/Error404';

function App() {
  const [ users, setUsers ] = useState( [] );
  const [ posts, setPosts ] = useState( [] );

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Index users={users} setUsers={setUsers}/>}/>
        <Route path="/home" element={<Home users={users} setUsers={setUsers} posts={posts} setPosts={setPosts}/>}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-a-post" element={<CreateAPost />}/>
        <Route path="/posts/:post_id" element={<SinglePost />}/>
        <Route path="/*" element={<Error404 />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
