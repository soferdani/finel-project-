import { Grid } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'
import { useHistory, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Calendar from '../calender/Calendar'
import Home from '../Home/Home'
import Properties from '../Home/Properties'
import Menu from './Menu'


const Container = inject('user')(observer((props) => {

    const { user } = props

    const history = useHistory()

    async function handleLogout() {
        await Auth.signOut()
        user.userHasAuthenticated(false)
        history.push('/login')
    }

    return (
        <Router>
            <Grid item xs={12} container>
                <Menu handleLogout={handleLogout} />
                <Route 
                    path='/home' 
                    exact render={({ match }) => 
                        <Properties 
                            match={match} 
                        />
                    }
                />
                <Route 
                    path='/home/calendar' 
                    exact render={({ match }) => 
                        <Calendar 
                            match={match} 
                        />
                    }
                />
            </Grid>
        </Router>
    )

}))

export default Container