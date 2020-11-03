import { Grid, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'

const useStyles = makeStyles((theme) => ({
    titlesContainer: {
        marginTop: '10px',
        marginBottom: '5px'
    },
    tableTitles: {
        fontWeight: 'bold'
    },
    tableCell: {
        marginBottom: '5px'
    }
}))
const ServiceProvidersTable = inject('user')(observer((props) => {  

    const { user, serviceProviders } = props

    const classes = useStyles()

    return (
        <Fragment>
            <Grid 
                item 
                xs={12} 
                container 
                direction='row' 
                className={classes.titlesContainer}
            >
                <Grid item xs={2}>
                    <Typography variant='subtitle1' className={classes.tableTitles}>
                        First Name
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='subtitle1' className={classes.tableTitles}>
                        Last Name
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='subtitle1' className={classes.tableTitles}>
                        Type
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='subtitle1' className={classes.tableTitles}>
                        Email
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='subtitle1' className={classes.tableTitles}>
                        Phone
                    </Typography>
                </Grid>
            </Grid>
            <Grid 
                item 
                xs={12} 
                container 
                d
                className={classes.tableContainer}
            >
                {serviceProviders.map(p => 
                    <Grid item xs={12} container direction='row' className={classes.tableCell}>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {p.firstName}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {p.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {p.type.type}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='body1'>
                                {p.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {p.phone}
                            </Typography>
                        </Grid>
                    </Grid> 
                )}
            </Grid>
        </Fragment>
    )
}))

export default ServiceProvidersTable