import { inject, observer } from 'mobx-react'
import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Container from './Layout/Container'

const Routes = inject('user')(observer((props) => {

    const { user } = props

    return (
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
                    match={match} 
                />
                }
            />
        </Router>
    )
}))

export default Routes