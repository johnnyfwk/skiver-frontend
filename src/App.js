import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Index from './components/Index';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
