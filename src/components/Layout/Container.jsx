import { Grid, makeStyles } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import Properties from '../Home/Properties'
import Menu from './Menu'

const useStyles = makeStyles((theme) => ({
    homeContainer: {
        height: '100%',
        padding: '20px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 160,
            paddingTop: '40px',
            padding: '30px',
        },
    },
    container: {
        height: '91vh'
    }
}))

const Container = inject('user')(observer((props) => {

    const classes = useStyles()

    const history = useHistory()

    const { user } = props

    async function handleLogout() {
        await Auth.signOut()
        user.userHasAuthenticated(false)
        history.push('/login')
    }

    return (
        <Router>
            <Grid item xs={12} container className={classes.container}>
                <Menu handleLogout={handleLogout} />
                <Redirect from='/home' to='/home/properties' />
                <Grid 
                    item 
                    xs={12} 
                    container 
                    className={classes.homeContainer} 
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
                </Grid>
            </Grid>
        </Router>
    )

}))

export default Container