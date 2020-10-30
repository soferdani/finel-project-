import { Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
// import Demo from "./demo";

const useStyles = makeStyles({
    calendarContainer: {
        marginLeft: 200,
        padding: '40px'
    }
})

const Calendar = inject('user')(observer((props) => {

    const { user } = props

    useEffect(() => {
        user.loadProperteisBooking()
    }, [])
    // console.log(user.properties[0]);
    const classes = useStyles()

    return (
        <Grid className={classes.calendarContainer}>
            {user.properties.map(p => {
               return p.booking.map(b => <p>channel: {b.channel}
                endDate: {b.endDate}
                firstName: {b.firstName}
                gusts: {b.gusts}
                id: {b.id}
                img: {b.img}
                lastName: {b.lastName}
                nights: {b.nights}
                startDate: {b.startDate}</p>)
                })}
        </Grid>
    )

}))

export default Calendar