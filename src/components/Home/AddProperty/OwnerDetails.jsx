import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export const OwnerDetails = (props) => {

    const { open, handleChange, handleCloseDialog } = props
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        phone: '',
        country: '',
        email: ''
    })

    const handleOwnerChange = (event) => {
        setOwnerDetails({ ...ownerDetails, [event.target.name]: event.target.value })
    }

    const addOwner = () => {
        handleChange(null,ownerDetails, true)
        handleCloseDialog()
    }

    const closeOwnerDialog = () => {
        for (let p in ownerDetails) {
            ownerDetails[p] = ''
        }
        handleCloseDialog()
    }

    return (
        <Dialog open={open} onClose={closeOwnerDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Owner</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fiil the Owner details
        </DialogContentText>
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="name"
                    label="Owner Name"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="phone"
                    label="Owner Phone Number"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="country"
                    label="Owner Country"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="email"
                    label="Owner Email"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeOwnerDialog} color="primary">
                    Cancel
            </Button>
                <Button onClick={addOwner} color="primary">
                    ADD OWNER
            </Button>
            </DialogActions>
        </Dialog >
    )
}
