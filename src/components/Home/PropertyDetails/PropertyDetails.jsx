import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Grid,
    Divider,
    Tabs,
    Tab
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import ToDos from './ToDos/ToDos';
import PropertyCalendar from './PropertyCalendar'
import DetailsCard from './DetailsCard'
import PropertyServiceProviders from './PropertyServiceProviders'

const useStyles = makeStyles((theme) => ({
    detailsContainer: {
        height: '82vh'
    },
    root: {
        width: '100%',
        paddingTop: '5px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 40
        },
        height: '100%'
    },
    cardHead: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    img: {
        height: '100px',
        width: '150px',
        borderRadius: '5px',
        boxShadow: '0px 0px 3px black'
    },
    cardDetails: {
        marginTop: '15px'
    }
}))

const PropertyDetails = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { user, propertyId } = props

    const property = user.properties.find(p => p.id === parseInt(propertyId))

    const [value, setValue] = useState(0);

    function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Grid item xs={12} container className={classes.detailsContainer}>
            <Card className={classes.root}>
                <CardContent>
                    <Grid item xs={12} container direction='row' className={classes.cardHead} alignItems='flex-end'> 
                        <Grid item xs={7}>
                            <Typography variant='h5'>
                                {property.name}
                            </Typography>
                            <Typography variant='body2'>
                                {property.address}
                            </Typography>
                        </Grid> 
                        <Grid item xs={5} container justify='flex-end'>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={classes.img}
                                image={property.img}
                                title="Contemplative Reptile"
                            />
                        </Grid>
                    </ Grid>
                    <Divider />
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="Calendar" {...a11yProps(1)} />
                        <Tab label="To Dos" {...a11yProps(2)} />
                        <Tab label="Service Providers" {...a11yProps(3)} />
                    </Tabs>
                    <Grid 
                        hidden={value !== 0}
                        item 
                        xs={12} 
                        className={classes.cardDetails}
                    >
                        <DetailsCard property={property} />
                    </Grid>
                    <Grid 
                        hidden={value !== 1}
                        item 
                        xs={12} 
                        className={classes.cardDetails}
                    >
                        <PropertyCalendar value={value} bookings={property.booking}/>
                    </Grid>
                    <Grid 
                        hidden={value !== 2}
                        item 
                        xs={12} 
                        className={classes.cardDetails}
                    >
                        <ToDos toDos={property.todoList} property={property.id} />
                    </Grid>
                    <Grid 
                        hidden={value !== 3}
                        item 
                        xs={12} 
                        className={classes.cardDetails}
                    >
                        <PropertyServiceProviders serviceProviders={property.serviceWorkers}/>
                    </Grid>   
                        
                </CardContent> 
            </Card>
        </Grid>
    )
}))

export default PropertyDetails