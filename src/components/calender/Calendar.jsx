import { Grid, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const useStyles = makeStyles((theme) => ({
  cardDetails: {
    marginTop: '15px'
  },
  calendarContainer: {
    maxWidth: '90%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 100,
      maxWidth: '90%',
      height: 600
    }
  }
}))

const Calendar = inject('user')(observer((props) => {
  const classes = useStyles()
  const [booking, setBooking] = useState([])
  const { user } = props

  useEffect(() => {
    const newBooking = []
    user.properties.forEach(p => {
      p.booking.forEach(b => {
        newBooking.push({
          startDate: b.startDate,
          endDate: b.endDate,
          title: b.firstName + " " + b.lastName
        })
      })
    })
    setBooking(newBooking)
  }, [])

  console.log(user.properties[0].booking);

  return (
    <Grid
      item
      xs={12}
      className={classes.cardDetails}>

      <Grid
        item
        xs={12}
        justify="center">
        `<Typography variant='h5'>
          All properties Schedule
  `     </Typography>`
  </Grid>

      <Paper className={classes.calendarContainer}>

        <Scheduler
          data={booking}
          height='100%'
        >
          <ViewState
            defaultCurrentDate={Date.now()}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator onClick={() => console.log('hello')} />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    </Grid >
  )
}))
export default Calendar