import { Grid, makeStyles } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'
import { useHistory, BrowserRouter as Router, Route, Redirect, IndexRoute } from 'react-router-dom'
import Calendar from '../calender/Calendar'
import Properties from '../Home/Properties'
import Menu from './Menu'

import Profile from '../profile/Profile'
import ServiceProvMain from '../serviceProviders/serviceProvMain'

const useStyles = makeStyles((theme) => ({
    homeContainer: {
        padding: '20px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 160,
            paddingTop: '40px',
            padding: '30px',
        },
    }
}))

const Container = inject('user')(observer((props) => {

    const classes = useStyles()

    const history = useHistory()

    const { user } = props

    async function handleLogout() {
        await Auth.signOut()
        user.userHasAuthenticated(false)
        localStorage.clear()
        history.push('/login')
    }

    return (
        <Router>
            <Grid item xs={12} container className={classes.container} alignItems='flex-start'>
                <Menu handleLogout={handleLogout} />
                <Redirect to={localStorage.currentRoute}/>
                <Grid
                    item
                    xs={12}
                    className={classes.homeContainer}
                    container

                >
                    <Route
                        path='/home/properties'
                        exact render={({ match }) =>
                            <Properties
                                match={match}
                            />
                        }
                    />
                    <Route
                        path='/home/properties/:propertyId'
                        exact render={({ match }) =>
                            <Properties
                                match={match}
                            />
                        }
                    />

                    <Route
                        path='/calendar'
                        exact render={({ match }) =>
                            <Calendar
                                match={match}
                            />
                        }
                    />
                    <Route
                        path='/profile'
                        exact render={() =>
                            <Profile />
                        }
                    />
                    <Route
                        path='/serviceproviders'
                        exact render={() => 
                            <ServiceProvMain />
                        } 
                    />

                </Grid>
            </Grid>
        </Router>
    )

}))

export default Container