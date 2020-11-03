
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment, useState } from 'react'
import moment from 'moment'
import {
    Scheduler,
    WeekView,
    Appointments,
  } from '@devexpress/dx-react-scheduler-material-ui'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    calendarContainer:{
      maxWidth: '100%',
      height:350,
      [theme.breakpoints.up('md')]: {
          height: 400
      }
    }
  }))

const PropertyCalendar = inject('user')(observer((props) => {

    const { user, bookings, value } = props
    const [bookingData, setBookingData ]= useState([])
    const classes = useStyles()

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
            endDate: nextEndDate.toDate()
        }
    }

    useEffect(()=>{
        const newBookingData = bookings.map(({startDate, endDate, name, ...restArgs }) => {
            const result = {
            ...makeTodayAppointment(),
            title: name,
            ...restArgs,
            }
            date += 1;
            if (date > 31) date = 1
                return result
        })
        setBookingData(newBookingData)
    }, [])
    

    console.log(bookingData);
    return (
        <Fragment>
            <Typography variant='h6'>
                Weekly Schedule
            </Typography>
            <Paper className={classes.calendarContainer}>
                <Scheduler
                    data={bookingData}
                    height='100%'
                >
                    <WeekView
                        startDayHour={1}
                        endDayHour={23}
                    />
                    <Appointments />
                </Scheduler>
            </Paper>
        </Fragment>
    )
}))

export default PropertyCalendar