import { Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { useHistory, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Properties from './Properties'


const useStyles = makeStyles((theme) => ({
    homeContainer: {
        padding: '20px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 160,
            paddingTop: '40px',
            padding: '30px',
        },
      },
}))

const Home = inject('user')(observer((props) => {

    const { user } = props

    const classes = useStyles()

    return (
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
    )

}))

export default Home