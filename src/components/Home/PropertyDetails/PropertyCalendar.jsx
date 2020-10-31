import { Appointments, Scheduler, WeekView } from '@devexpress/dx-react-scheduler'
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
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

const PropertyCalendar = inject('user')(observer((props) => { 

    const { user, bookings, value } = props
    const classes = useStyles()
    
    console.log(props)
    const currentDate = moment()
    let date = currentDate.date()

    const bookingData = bookings.map(({ startDate, endDate, ...restArgs }) => {
        const result = {
          ...makeTodayAppointment(startDate, endDate),
          ...restArgs,
        }
        date += 1;
        if (date > 31) date = 1
            return result
    })

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

    return (
        
        <Grid 
            hidden={value !== 1}
            item 
            xs={12} 
            className={classes.cardDetails}
        >
            <Typography variant='h6'>
                Weekly Schedule
            </Typography>
            <Paper className={classes.calendarContainer}>
                {/* <Scheduler  
                    data={bookingData}
                    height='100%'
                >
                <WeekView
                    startDayHour={9}
                    endDayHour={19}
                />
                <Appointments />
                </Scheduler> */}
            </Paper>
        </Grid>
    )
}))

export default PropertyCalendar