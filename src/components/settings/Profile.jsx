import { Grid, List, ListItem, Divider, ListItemText, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import NameForm from './NameForm'

const useStyles = makeStyles({
    profileContainer: {
        marginLeft: 200,
        padding: '40px'
    }
})

const Profile = inject('user')(observer((props) => {
    const { user } = props
    const [error, setError] = useState()
    const [showNameForm, setShowNameForm] = useState(false)
    const [fields, setFields] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        password: '',
        confirmPassword: '',
        confirmationCode: '',
    })

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         await user.loadUserDetails(user.id)
    //     }
    //     fetchUserData()
    // }, [])


    const classes = useStyles()

    async function handleFieldChange(event) {
        setFields({ ...fields, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {

    }

    return (
        <Grid className={classes.profileContainer}>
            <p>Image: <img src={user.img} /> </p>
            Details:
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                {showNameForm ?
                    <NameForm /> :
                    <ListItem button onClick={() => setShowNameForm(true)}>
                        <ListItemText primary="Name" />
                        <ListItemText primary={user.firstName + " " + user.lastName} />
                    </ListItem>
                }
                <Divider />
                <ListItem button divider>
                    <ListItemText primary="Email" />
                    <ListItemText primary={user.email} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Phone" />
                    <ListItemText primary={user.phone} />
                </ListItem>
                <Divider light />
                <ListItem>
                    <ListItemText primary="Join Date" />
                    <ListItemText primary={user.dateJoin} />
                </ListItem>
                <Divider light />
                <ListItem>
                    <ListItemText primary="User Type" />
                    <ListItemText primary={user.type} />
                </ListItem>
            </List>
        </Grid>
    )

}))

export default Profile