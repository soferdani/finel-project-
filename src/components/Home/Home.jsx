import { Grid } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'

const Home = inject('user')(observer((props) => {

    return (
        <Grid>
            
        </Grid>
    )

}))

export default Home