import { Grid, List, ListItem, Divider, ListItemText, TextField, makeStyles, Snackbar, Typography, Paper } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';



const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];




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

    useEffect(() => {
        const feachDataFromDB = async () => {
            const mostBookingForUser = await user.getMostBookingForUser()
            // mostBookingForUser.forEach(t => tempArry.push({t.channel}))
            // setBookingDistribution(...mostBookingForUser)
            // console.log(bookingDistribution);
        }
        feachDataFromDB()
    }, []) 
    



    return (
        <Grid className={classes.profileContainer} item xs={12} container>
        <BarChart width={600} height={300} data={bookingDistribution}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="uv" fill="#8884d8" barSize={30} />
    </BarChart>

    
        </Grid>
    )

}))

export default Charts