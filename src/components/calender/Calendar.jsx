import { Grid, makeStyles } from '@material-ui/core'
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
  calendarContainer: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 100,
      paddingTop: '40px',
      padding: '30px',
    },
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


  return (
    <Grid item
      xs={12}
      container className={classes.calendarContainer}>

      <Paper>
        <Scheduler
          data={booking}
        >
          <ViewState
            defaultCurrentDate={Date.now()}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator onClick={()=> console.log('hello')} />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    </Grid>
  )
}))
export default Calendar