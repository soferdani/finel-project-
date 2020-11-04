import { Grid, List, ListItem, Divider, ListItemText, TextField, makeStyles, Snackbar, Typography, Paper } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


const useStyles = makeStyles((theme) => ({
    profileContainer: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 200,
            maxWidth: '70%'
        }
    },
    fields: {
        width: '100%'
    }
}))

const Charts = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()

    const [bookingDistribution, setBookingDistribution] = useState ([])
    const [allTodoStatus, setAllTodoStatus] = useState ([])

    useEffect(() => {
        const feachDataFromDB = async () => {
            const mostBookingForUser = await user.getMostBookingForUser()
            const allUserTodos = await user.getAllTodoStatus()
            setAllTodoStatus(allUserTodos)
            setBookingDistribution(mostBookingForUser)
        }
        feachDataFromDB()
    }, []) 
    

    console.log(allTodoStatus);
    // console.log(bookingDistribution);


    




    return (
        <Grid className={classes.profileContainer} container item xs={12} >
        <BarChart width={600} height={300} data={bookingDistribution}>
            <XAxis dataKey="channel" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="numberOfBooking" fill="#8884d8" barSize={30} />
    </BarChart>


        <div>Total mission complete in your account :  </div>
        <div>Total mission incomplete in your account :   </div>
    
        </Grid>
    )

}))

export default Charts