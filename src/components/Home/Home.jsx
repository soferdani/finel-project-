import { Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import Property from './property'

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
            {user.properties.map(p => 
                <Property property={p} /> )}
            
        </Grid>
    )

}))

export default Home