import { Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import Property from './property'

const useStyles = makeStyles({
    homeContainer: {
        marginLeft: 200,
        padding: '40px'
    }
})

const Home = inject('user')(observer((props) => {

    const { user } = props

    const classes = useStyles()

    return (
        <Grid className={classes.homeContainer}>
            <Property />
        </Grid>
    )

}))

export default Home