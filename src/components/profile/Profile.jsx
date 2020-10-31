import { Grid, List, ListItem, Divider, ListItemText, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import NameForm from './NameForm'

const useStyles = makeStyles({
    profileContainer: {
        marginLeft: 50,
        padding: '10px'
    }
})

const Profile = inject('user')(observer((props) => {
    const { user } = props
    const [fields, setFields] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        password: '',
        confirmPassword: ''
    })

    const [openName, setOpenName] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const [openPhone, setOpenPhone] = useState(false);

    const handleClickName = () => {
        setOpenName(true);
    };
    const handleClickEmail = () => {
        setOpenEmail(true);
    };
    const handleClickPhone = () => {
        setOpenPhone(true);
    };

    const classes = useStyles()

    async function handleFieldChange(event) {
        setFields({ ...fields, [event.target.name]: event.target.value })
    }

    async function handleSubmit(fields) {
        console.log(fields);
    }

    return (
        <Grid item xs={12} className={classes.profileContainer}>
            Details:
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem button  onClick={handleClickName}>
                        <ListItemText primary="Name" />
                        <ListItemText primary={user.firstName + " " + user.lastName} />
                    </ListItem>
                    <NameForm
                    open={openName}
                    setOpen={setOpenName}
                    fields={[
                        {name: "firstName", label:'First Name', type:"name", value: fields.firstName},
                        {name: "lastName", label:'Last Name', type:"name", value: fields.lastName}
                        ]}
                        handleFieldChange={handleFieldChange}
                        handleSubmit={handleSubmit}/>
                <Divider />
                <ListItem button onClick={handleClickEmail} divider>
                    <ListItemText primary="Email" />
                    <ListItemText primary={user.email} />
                </ListItem>
                <NameForm
                    open={openEmail}
                    setOpen={setOpenEmail}
                    fields={[
                        {name: "email", label:'Email', type:"email", value: fields.email}
                        ]}
                        handleFieldChange={handleFieldChange}
                        handleSubmit={handleSubmit}/>
                <ListItem button onClick={handleClickPhone}>
                    <ListItemText primary="Phone" />
                    <ListItemText primary={user.phone} />
                </ListItem>
                <NameForm
                    open={openPhone}
                    setOpen={setOpenPhone}
                    fields={[
                        {name: "phone", label:'Phone', type:"phone", value: fields.phone}
                        ]}
                        handleFieldChange={handleFieldChange}
                        handleSubmit={handleSubmit}/>
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
            <p>Image</p>
            <p><img src={user.img} /> </p>
        </Grid>
    )

}))

export default Profile