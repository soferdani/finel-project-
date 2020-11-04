import { Grid, List, ListItem, Divider, ListItemText, TextField, makeStyles, Snackbar, Typography, Paper, Badge } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '@material-ui/core/Card';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import pieChart from './PaiChart';

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
    }
}))

const Charts = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()



    const [bookingDistribution, setBookingDistribution] = useState ([])
    const [allTodoComplete, setAllTodoComplete ] = useState ([])

    useEffect(() => {
        const feachDataFromDB = async () => {
            const mostBookingForUser = await user.getMostBookingForUser()
            setBookingDistribution(mostBookingForUser.filter(b => b.channel !== "undefined" && b.channel !== null))
            // user.mostBookingApartment()
        }
        feachDataFromDB()
    }, []) 
    


    
const data01 = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
  ];
  
  const data02 = [
    { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 },
  ];


    



    return (
        <Grid className={classes.chartsContainer} container item xs={12} >
            <BarChart width={600} height={300} data={bookingDistribution}>
                <XAxis dataKey="channel" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="numberOfBooking" fill="#8884d8" barSize={30} />
            </BarChart>

            <PieChart width={400} height={400}>
                <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                <Tooltip />
            </PieChart>
            

        </Grid>
    )

}))

export default Charts