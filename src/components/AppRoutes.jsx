import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Redirect, Route, useLocation } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Container from './Layout/Container'

const Routes = inject('user')(observer((props) => {

    const { user } = props

    if(!localStorage.currentRoute){
        localStorage.setItem('currentRoute', '/home/properties')
    }

    return (
        <Router>
            {user.isAuthenticated === true
                ?   <Redirect from='/' to={localStorage.currentRoute} />
                :   <Redirect from='/' to='/login' />
            }
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
                exact path='/home/properties'
                render={({ match }) =>
                <Container
                    match={match}
                />
                }
            >
            </Route>
        </Router>
    )
}))

export default Routes