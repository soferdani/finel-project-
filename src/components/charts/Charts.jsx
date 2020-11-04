import { Grid, List, ListItem, Divider, ListItemText, TextField, makeStyles, Snackbar, Typography, Paper, Badge } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
    chartsContainer: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 200,
            maxWidth: '70%'
        }
    },
    fields: {
        width: '100%'
    },
    badge1: {
        minWidth: '25%',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: "#219EBC",
            padding:100,
            borderRadius: 80,
            margin: 20
        }
    },
    badge2: {
        minWidth: '25%',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: "#8ECAE6",
            padding:100,
            borderRadius: 80,
            margin: 20
        }
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

    const [product] = useState({
        name: "monthly subscription",
        price: 1.00
    }) 





    return (
        <Grid className={classes.chartsContainer} container item xs={12} >
        <BarChart width={600} height={300} data={bookingDistribution}>
            <XAxis dataKey="channel" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="numberOfBooking" fill="#8884d8" barSize={30} />
    </BarChart>


        
        <Card className={classes.badge1}> Total todos left: </Card>
        
        <Card className={classes.badge2}> info2 </Card>
            
        </Grid>
    )

}))

export default Charts