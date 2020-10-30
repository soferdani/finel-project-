import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Auth } from "aws-amplify"
import './App.css'
import { inject, observer } from 'mobx-react'
import Routes from './components/AppRoutes'

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
    <Grid item xs={12} container >
      <Routes />
    </Grid>
  )
}))


export default App;
