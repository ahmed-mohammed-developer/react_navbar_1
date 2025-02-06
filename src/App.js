import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './component/NavBar/NavBar1';
import What from './component/What/What';
import Hero from './component/Hero/Hero';
function App() {
 
  return (
    <div className="App">
     <NavBar />
     <Hero />
     <What />
    </div>
  );
}

export default App;

