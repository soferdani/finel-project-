import { Grid, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  AppointmentForm,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  EditRecurrenceMenu,
  AppointmentTooltip,
  ConfirmationDialog
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
  const { user } = props
  const classes = useStyles()
  const [booking, setBooking] = useState([])
  const [addedAppointment, setAddedAppointment] = useState({})
  const [appointmentChanges, setAppointmentChanges] = useState({})
  const [editingAppointment, setEditingAppointment] = useState(undefined)

  useEffect(() => {
    const newBooking = []
    user.properties.forEach(p => {
      p.booking.forEach(b => {
        newBooking.push({
          startDate: b.startDate,
          endDate: b.endDate,
          title: b.name + " in " + p.name,
          id: b.id
        })
      })
    })
    setBooking(newBooking)
  }, [user])

  async function commitChanges({ added, changed, deleted }) {
      if (added) {
        added.id = await user.addNewBooking({
          startDate: added.startDate,
          endDate: added.endDate,
          name: added.title,
          guests: 1,
          property: parseInt(added.notes)})
        setBooking([...booking,  added ]);
      }
      if (changed) {
        let id
        const newBooking = booking.map(appointment => {
          if(changed[appointment.id]){
            id = appointment.id
            return { ...appointment, ...changed[appointment.id] }
           }
           return  appointment
          });
          setBooking(newBooking)
          const bookingToDB = {}
          for(let key in changed[id]){
            const newKey = key === 'title' ? 'name' : key === 'notes' ? 'property' : key === 'startDate' ? 'start_date' : key === 'endDate' ? "end_date" : key
            changed[id][key] = newKey === 'property' ? parseInt(changed[id][key]) : changed[id][key]
            bookingToDB[newKey] = changed[id][key]
          }
          // console.log(bookingToDB);
          user.updateBooking(id, bookingToDB);
      }
      if (deleted !== undefined) {
        user.deleteBooking(deleted)
        const newBooking = booking.filter(appointment => appointment.id !== deleted);
        setBooking(newBooking)
      }
      return { booking };
  }

  return (
    <Grid
      item
      xs={12}
      className={classes.cardDetails}>

      <Grid
        container
        item
        xs={12}
        justify="center">
        <Typography variant='h5'>
          All properties Schedule
        </Typography>
  </Grid>

      <Paper className={classes.calendarContainer}>

        <Scheduler
          data={booking}
          height='100%'
        >
          <ViewState
            defaultCurrentDate={Date.now()}
          />

          <EditingState
            onCommitChanges={commitChanges}

            addedAppointment={addedAppointment}
            onAddedAppointmentChange={(addedAppointment)=> setAddedAppointment(addedAppointment)}

            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={(appointmentChanges)=> setAppointmentChanges(appointmentChanges)}

            editingAppointment={editingAppointment}
            onEditingAppointmentChange={(editingAppointment)=> setEditingAppointment(editingAppointment)}
          />

          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
        <AppointmentForm />
        </Scheduler>
      </Paper>
    </Grid >
  )
}))
export default Calendar