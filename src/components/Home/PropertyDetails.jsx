import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
    Card, 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Button,
    Typography, 
    Grid,
    CardHeader,
    Divider
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui'
import moment from 'moment'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 40
    }
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
  },
  calendarContainer:{
    maxWidth: '100%',
    height:350,
    [theme.breakpoints.up('sm')]: {
        height: 400
    }
  }
}))

const PropertyDetails = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { user, propertyId } = props

    const property = user.properties.find(p => p.id === parseInt(propertyId))

    const currentDate = moment()
    let date = currentDate.date()

    const makeTodayAppointment = (startDate, endDate) => {
        const days = moment(startDate).diff(endDate, 'days');
        const nextStartDate = moment(startDate)
            .year(currentDate.year())
            .month(currentDate.month())
            .date(date);
        const nextEndDate = moment(endDate)
            .year(currentDate.year())
            .month(currentDate.month())
            .date(date + days)

        return {
            startDate: nextStartDate.toDate(),
            endDate: nextEndDate.toDate(),
        }
    }

    const bookingData = property.booking.map(({ startDate, endDate, ...restArgs }) => {
        const result = {
          ...makeTodayAppointment(startDate, endDate),
          ...restArgs,
        }
        date += 1;
        if (date > 31) date = 1
            return result
    })


    return (
        <Grid item xs={12} container >
            <Card className={classes.root}>
                <CardContent>
                    <Grid item xs={12} container direction='row' className={classes.cardHead} alignItems='flex-end'> 
                        <Grid item xs={7}>
                            <Typography variant='h5'>
                                Property Name
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
                    <Grid item xs={12} className={classes.cardDetails}>
                        <Typography variant='h6'>
                            Weekly Schedule
                        </Typography>
                        <Paper className={classes.calendarContainer}>
                            <Scheduler
                                data={bookingData}
                                className={classes.calendar}
                                height='100%'
                            >
                            <WeekView
                                startDayHour={9}
                                endDayHour={19}
                            />
                            <Appointments />
                            </Scheduler>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.cardDetails}>
                        <Typography variant='h6'>
                            Open tasks
                        </Typography>

                    </Grid>
                    <Grid item xs={12} className={classes.cardDetails}>
                        <Typography variant='h6'>
                            Service providers
                        </Typography>
                        
                    </Grid>
                </CardContent> 
            </Card>
        </Grid>
    )
}))

export default PropertyDetails