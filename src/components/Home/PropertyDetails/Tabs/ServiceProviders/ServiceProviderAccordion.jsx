import { Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    serviceProviderCard: {
        backgroundColor: '#8ecae6'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
}))
const ServiceProvidersAccordion = inject('user')(observer((props) => {  

    const { user, serviceProviders } = props

    const classes = useStyles()

    return (
        <Fragment>
            {serviceProviders.map(p => 
                <Accordion className={classes.serviceProviderCard}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{p.firstName} {p.lastName} - {p.type.type}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} container direction='column'>
                            <Typography variant="subtitle2">
                                EMAIL: {p.email}
                            </Typography>
                            <Typography variant="subtitle2">
                                PHONE: {p.phone}
                            </Typography>
                        </Grid>
                    </AccordionDetails>
                </Accordion> )}
        </Fragment>

    )
}))

export default ServiceProvidersAccordion