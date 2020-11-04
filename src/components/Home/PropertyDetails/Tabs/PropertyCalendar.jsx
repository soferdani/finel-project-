
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
      height:270,
      [theme.breakpoints.up('md')]: {
          height: 340
      },
      [theme.breakpoints.up('xl')]: {
        height: 510
    }
    }
}))

const PropertyCalendar = inject('user')(observer((props) => {

    const { user, bookings, value } = props
    const [bookingData, setBookingData] = useState([])
    const classes = useStyles()

    const currentDate = moment()
    let date = currentDate.date()

    const makeTodayAppointment = (startDate, endDate) => {
        const diff = moment(endDate).diff(moment(startDate), "days")
        const meetings = []
        for (let i = 0; i < diff; i++) {
            let newEndDate = moment(startDate).add(12, 'hours').format('YYYY/MM/DD HH:mm:ss')
          if( i === diff-1){
              newEndDate = endDate
            }
            meetings.push({ startDate, endDate: newEndDate })
            if(i > 0){
                startDate = moment(startDate).add(1, 'days').format('YYYY/MM/DD HH:mm:ss')
                console.log(startDate);
            }else{
                startDate = moment(startDate).startOf('day').add(32, 'hours').format('YYYY/MM/DD HH:mm:ss')
                console.log(startDate);
            }
        }
        return meetings
    }

    useEffect(() => {
        const spliData = []
        const newBookingData = bookings.map(({ startDate, endDate, name, ...restArgs }) => {
            if (moment(startDate).diff(moment(endDate), "days") === 0) {
                return {
                    startDate,
                    endDate,
                    title: name,
                    ...restArgs,
                }
            } else {
                makeTodayAppointment(startDate, endDate).map(({startDate, endDate}) => {
                    spliData.push({startDate, endDate, title: name, ...restArgs })
                    return {startDate, endDate, title: name, ...restArgs }
                })
                return 'hello'
            }
        })
        spliData.forEach(s=> newBookingData.push(s))
        setBookingData(newBookingData)
    }, [bookings])

    // console.log(bookingData)

    // const meeting = [
    //     {
    //         endDate: "2020/11/02 18:00:00",
    //         guests: undefined,
    //         id: 54,
    //         phone: "fff",
    //         property: 3,
    //         startDate: "2020/11/02 08:00:00",
    //         title: "fffaa"
    //     }
    // ]
    
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
                        startDayHour={7}
                        endDayHour={19}
                    />
                    <Appointments />
                </Scheduler>
            </Paper>
        </Fragment>
    )
}))

export default PropertyCalendar