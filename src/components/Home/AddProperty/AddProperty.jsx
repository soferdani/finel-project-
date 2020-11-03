import { inject, observer } from 'mobx-react';
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles';
import { OwnerDetails } from './OwnerDetails';
import { Checkbox, Grid, MenuItem } from '@material-ui/core';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const AddProperty = inject('user')(observer((props) => {
    const classes = useStyles();
    const [ownersList, setOwnersList] = useState([])
    const { open, handleCloseAddDialog, user } = props
    useEffect(() => {
        const getOwnerList = async () => {
            const dbList = await user.getOwnerList()
            setOwnersList(dbList)
        }
        getOwnerList()
    }, [])
    const [openOwnerDialog, setOpenOwnerDialog] = useState(false)

    const [propertyDetails, setPropertyDitails] = useState({
        name: '',
        address: '',
        img: '',
        owner: '',
        rooms: '',
        bathrooms: '',
        guests: '',
        kitchen: false,
        ac: false,
        wifi: false,
        pool: false,
    })

    const handleChange = event => {
        if (event.target.value) {
            setPropertyDitails({ ...propertyDetails, [event.target.name]: event.target.value })
        }
        if (event.target.checked) {
            console.log(setPropertyDitails({ ...propertyDetails, [event.target.name]: event.target.checked }))
        }

    }

    const handleChangeOwner = (event, owner, fromOwnerDialog = false) => {
        if (fromOwnerDialog) {
            return setPropertyDitails({ ...propertyDetails, owner: owner })
        }
        const SelectedOwner = ownersList.find(o => o.name === event.target.value)
        setPropertyDitails({ ...propertyDetails, owner: { ...SelectedOwner } })
    }

    const handleSubmitProperty = async () => {
        await user.addNewProperty(propertyDetails)
        handleClosePropertyDialog(false)

    }

    const handleOpenOwnerDialog = () => {
        setOpenOwnerDialog(true)
    }

    const handleCloseOwnerDialog = () => {
        setOpenOwnerDialog(false)
    }

    const handleClosePropertyDialog = () => {
        for (let i = 0; i < propertyDetails; i++) {
            propertyDetails[i] = ''
            if (i >= 8) {
                propertyDetails[i] = false
            }
        }
        handleCloseAddDialog()
    }
    
    return (
        <Dialog open={open} onClose={handleClosePropertyDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Property</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fiil the Property details in the form below
            </DialogContentText>
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="name"
                    label="Property Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="address"
                    label="address"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="img"
                    label="Property Imag URL"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <Grid container direction="row"
                    justify="space-between"
                    alignItems="center">
                    <Grid xs={6}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select Owner From List"
                            name='type'
                            onChange={handleChangeOwner}
                            fullWidth
                            SelectProps={{
                                MenuProps: {
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }
                            }}>
                            {ownersList.map(owner => (
                                <MenuItem id={owner.id} value={owner.name}>
                                    {owner.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    OR
                    <Grid>
                        {openOwnerDialog ?
                            <OwnerDetails
                                open={openOwnerDialog}
                                handleChange={handleChangeOwner}
                                handleCloseDialog={handleCloseOwnerDialog}
                            /> :
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenOwnerDialog}>
                                Create New Owner
                    </Button>
                        }
                    </Grid>
                </Grid>
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="rooms"
                    label="Room Number"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="bathrooms"
                    label="Bathroom Number"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="guests"
                    label="Max guests in Property"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                />
               Kitchen <Checkbox
                    checked={propertyDetails.kitchen}
                    label="Max guests in Property"
                    name='kitchen'
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                AC <Checkbox
                    checked={propertyDetails.ac}
                    label="Max guests in Property"
                    name='ac'
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                Wifi <Checkbox
                    checked={propertyDetails.wifi}
                    name='wifi'
                    label="Max guests in Property"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                Pool<Checkbox
                    checked={propertyDetails.pool}
                    label="Max guests in Property"
                    name='pool'
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePropertyDialog} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleSubmitProperty} color="primary">
                    ADD
            </Button>
            </DialogActions>
        </Dialog >
    )
}))

export default AddProperty;
