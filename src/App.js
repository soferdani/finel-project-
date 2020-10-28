import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, useHistory } from 'react-router-dom'
import { Auth } from "aws-amplify"
// import NavBar from './components/Layout/NavBar'
import './App.css';
import Login from './components/auth/Login';
import Container from './components/Layout/Container';
import Signup from './components/auth/Signup';
import { inject, observer } from 'mobx-react';

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

  const handleLogout = async () => {
    await Auth.signOut()
    user.userHasAuthenticated(false)
    return <Redirect to='/login' />
  }

  return (
    <Grid >
      <Router>
        {user.isAuthenticated === true
          ?   <Redirect from='/' to='/home' />
          :   <Redirect from='/' to='/login' />}
        <Route 
          path='/login' 
          exact render={({ match }) => 
            <Login 
              match={match} 
            />
          }
        />
        <Route 
          path='/signup' 
          exact render={({ match }) => 
            <Signup 
              match={match} 
            />
          }
        />
        <Route 
            path='/home' 
            exact render={({ match }) => 
              <Container 
                handleLogout={handleLogout}
                match={match} 
              />
            }
          />
      </Router>
    </Grid>
  )
}))


export default App;
