import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/Layout/NavBar'
import Container from './components/Layout/Container'
import './App.css';

function App() {

  return (

    <div className='app'>
      <NavBar />
      <Container />
    </div>
  );
}


export default App;
