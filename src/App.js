import { Grid } from '@material-ui/core';
import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
// import NavBar from './components/Layout/NavBar'
// import Container from './components/Layout/Container'
import './App.css';
import Login from './components/auth/Login';

function App() {

  return (
    <Grid >
      <Router>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route exact path='/login' component={Login} />
        {/* <NavBar />
        <Container /> */}
      </Router>
    </Grid>
  );
}


export default App;
