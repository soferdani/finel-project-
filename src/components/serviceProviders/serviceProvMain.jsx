import { Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme) => ({
    serviceContainer: {
        padding: '20px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 180,
            paddingTop: '40px',
            padding: '30px',
        },
    
        formControl: {

        }
    }
}))


const ServiceProvMain = inject('user')(observer((props) => {
    
    

    const classes = useStyles()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNum, setPhoneNum] = useState('')

    const addNewServiceProvider = () => {
        console.log(firstName, lastName,email ,phoneNum);
    }



    return (
        <Grid item 
        xs={12} 
        container className={classes.serviceContainer}>
                
            <TextField id="standard-basic" onChange = {(e) => {setFirstName(e.target.value)}} label="First Name" />
            <TextField id="standard-basic" onChange = {(e) => {setLastName(e.target.value)}} label="Last Name" />
            <TextField id="standard-basic" onChange = {(e) => {setEmail(e.target.value)}} label="Email" />
            <TextField id="standard-basic" onChange = {(e) => {setPhoneNum(e.target.value)}} label="Phone Number" />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Service Type</InputLabel>
                <Select
                native
                value='{state.age}'
                inputProps={{
                name: 'age',
                id: 'age-native-simple',
                    }}>
                    
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={addNewServiceProvider} color="primary">Submit</Button>
        </Grid>
    )
}))

export default ServiceProvMain