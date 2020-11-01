import { Grid, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'

const useStyles = makeStyles({
    titlesContainer: {
        marginBottom: '5px'
    },
    tableTitles: {
        fontWeight: 'bold'
    },
    tableCell: {
        marginBottom: '5px'
    }
})
const PropertyServiceProviders = inject('user')(observer((props) => {  

    const { user, serviceProviders } = props

    const classes = useStyles()
    console.log(serviceProviders)

    return (
        <Fragment>
            <Typography variant='h6'>
                Service Providers
            </Typography>
            <Grid item xs={12} container direction='row' className={classes.titlesContainer}>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" className={classes.tableTitles}>
                        First Name
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" className={classes.tableTitles}>
                        Last Name
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" className={classes.tableTitles}>
                        Email
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" className={classes.tableTitles}>
                        Phone
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" className={classes.tableTitles}>
                        Type
                    </Typography>
                </Grid>
            </Grid>
            {serviceProviders.map(p => 
                <Grid item xs={12} container direction='row' className={classes.tableCell}>
                    <Grid item xs={2}>
                        {p.firstName}
                    </Grid>
                    <Grid item xs={2}>
                        {p.lastName}
                    </Grid>
                    <Grid item xs={3}>
                        {p.email}
                    </Grid>
                    <Grid item xs={3}>
                        {p.phone}
                    </Grid>
                    <Grid item xs={2}>
                        {p.type}
                    </Grid>
                </Grid> )}
        </Fragment>
    )
}))

export default PropertyServiceProviders