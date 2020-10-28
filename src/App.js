import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, useHistory } from 'react-router-dom'
import { Auth } from "aws-amplify"
import './App.css';
import Login from './components/auth/Login';
import Container from './components/Layout/Container';
import Signup from './components/auth/Signup';
import { inject, observer } from 'mobx-react';
import Routes from './components/Routes';

const App = inject('user')(observer((props) => {

  const { user } = props

  const [IsAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    onLoad();
  }, [])

  const onLoad = async () => {
    try {
      const session = await Auth.currentSession()
      user.userHasAuthenticated(session.idToken.payload.email, true)
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e)
      }
    }
  
    await setIsAuthenticating(false)
  }

  

  return (
    <Grid >
      <Routes />
    </Grid>
  )
}))


export default App;
