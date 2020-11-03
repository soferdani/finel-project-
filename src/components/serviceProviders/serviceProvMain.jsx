import { Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AllServiceProv from './allServiceProv';



const useStyles = makeStyles((theme) => ({
    serviceContainer: {
        padding: '20px',
        [theme.breakpoints.up('md')]: {
            marginLeft: 180,
            paddingTop: '40px',
            padding: '30px',
        },
    
        formControl: {

        }
    }
}))


const ServiceProvMain = inject('user')(observer((props) => {
    
    const { user } = props 
     

    const [allUesrType, setAllUesrType] = useState([])
    const [type, setType] = useState('')

    useEffect(() => {
        const getAllTypes = async () => {
            let userTypes = await user.loadUserTypes()

            userTypes = userTypes.filter(t => t.type.id != 1) //FIXME: this filter!!
            console.log(userTypes);
            setAllUesrType(userTypes)

        }
        getAllTypes()

    },[])



    const classes = useStyles()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')




    const addNewServiceProvider = () => {
        const serviceProvider = {
            firstName,
            lastName,
            email,
            phone,
            type: parseInt(type)
        }
        console.log(serviceProvider);
        user.addNewManagerEmployee(serviceProvider)
    }


    return (

        <Grid item 
        xs={12} 
        container className={classes.serviceContainer}>
                
            <TextField id="standard-basic" onChange = {(e) => {setFirstName(e.target.value)}} label="First Name" />
            <TextField id="standard-basic" onChange = {(e) => {setLastName(e.target.value)}} label="Last Name" />
            <TextField id="standard-basic" onChange = {(e) => {setEmail(e.target.value)}} label="Email" />
            <TextField id="standard-basic" onChange = {(e) => {setPhone(e.target.value)}} label="Phone Number" />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Service Type</InputLabel>
                <Select
                onChange = {(e)=> {setType(e.target.value)} }
                native
                value={type}
                inputProps={{
                name: 'age',
                id: 'age-native-simple',
                    }}>
                        {allUesrType.length>0 && allUesrType.map(t => <option value={t.id}>{t.type}</option>)}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={addNewServiceProvider} color="primary">Submit</Button>

            <AllServiceProv></AllServiceProv>
        </Grid>
    )
}))

export default ServiceProvMain