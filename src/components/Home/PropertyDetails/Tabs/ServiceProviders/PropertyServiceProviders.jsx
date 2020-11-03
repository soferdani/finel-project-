import { makeStyles, Typography, CssBaseline, Hidden, Grid, Button } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment, useState } from 'react'
import ServiceProvidersAccordion from './ServiceProviderAccordion'
import ServiceProvidersTable from './ServiceProviderTable'
import NewServiceProvider from './NewServiceProvider'

const useStyles = makeStyles((theme) => ({
    addButton: {
        color: '#fb8500',
        marginLeft: '10px',
        fontSize: '0.7em'
    }
}))

const PropertyServiceProviders = inject('user')(observer((props) => {  

    const { user, property } = props

    const serviceProviders = property.serviceWorkers

    const [openNew, setOpenNew] = useState(false)

    const findAvailableProviders = function() {
        const providers = []
        for(let worker of user.serviceWorkers) {
            const provider = serviceProviders.find(p => p.id === worker.id)
            !provider && providers.push(worker)
        }
        return providers
    }
    
    const availableProviders = findAvailableProviders()
    

    const handleOpenNewService = () => {
        setOpenNew(true);
      }
    
    const handleClose = () => {
        setOpenNew(false);
    }

    const handleSubmitService = async function(workerId) {
        user.addNewServiceProperty(property.id, workerId)
        handleClose()
    }

    const classes = useStyles()

    return (
        <Fragment>
            <Grid item xs={12} container direction='row' >
                <Typography variant='h6'>
                    Service Providers
                </Typography>
                <Button className={classes.addButton} onClick={handleOpenNewService}>NEW SERVICE PROVIDER</Button> 
            </Grid>
            <CssBaseline />
            <Hidden mdUp implementation="css">
                <ServiceProvidersAccordion serviceProviders={serviceProviders} />
            </Hidden>
            <Hidden smDown implementation="css">
                <ServiceProvidersTable serviceProviders={serviceProviders} />
            </Hidden>
            <NewServiceProvider 
                open={openNew} 
                availableProviders={availableProviders}
                handleClose={handleClose}
                handleSubmitService={handleSubmitService}
            />
        </Fragment>
    )
}))

export default PropertyServiceProviders