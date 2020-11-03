import { Grid, makeStyles, Divider } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import AllServiceProv from './allServiceProv';
import AddButton from '../Home/AddProperty/AddButton'
import UpdateServicer from './AddServicer'

const useStyles = makeStyles((theme) => ({
    serviceContainer: {
        padding: '20px',
        [theme.breakpoints.up('md')]: {
            marginLeft: 40,
            paddingTop: '40px',
        },

        formControl: {

        }
    }
}))


const ServiceProvMain = inject('user')(observer((props) => {

    const { user } = props
    const classes = useStyles()
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [value, setValue] = useState('')
    const [key, setKey] = useState('name')

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true)
    }
    const handleCloseAddDialog = () => {
        setAddDialogOpen(false)
    }

    const handleType = e => {
        setValue(e.target.value)
    }

    return (

        <Grid item
            xs={12}
            container className={classes.serviceContainer}>

            <TextField id="standard-basic" value={value} onChange={handleType} label={`Seacrh By ${key}`} />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Search Field</InputLabel>
                <Select
                    onChange={(e) => { setKey(e.target.value) }}
                    native
                    value={key}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                    }}>
                    <option value='name'>Name</option>
                    <option value='type'>Type</option>
                    <option value='country'>Country</option>
                </Select>
            </FormControl>
            <Divider />

            <AllServiceProv />
            <AddButton label={"Add Servicer"} handleOpenAddDialog={handleOpenAddDialog} />
            <UpdateServicer
                open={addDialogOpen}
                handleCloseAddDialog={handleCloseAddDialog}
            />
        </Grid>
    )
}))

export default ServiceProvMain