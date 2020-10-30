import { TextField, Button, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'

const useStyles = makeStyles({
    nameForm: {
        marginLeft: 200,
        padding: '40px',
        display: "grid",
        gridGap: "1vh"
    }
})

const NameForm = inject('user')(observer((props) => {
    const { user } = props
    const [fields, setFields] = useState({
        firstName: user.firstName,
        lastName: user.lastName
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

    return (
        <form className={classes.nameForm} noValidate autoComplete="off">
        <TextField id="firstName" label='First Name' value={fields.firstName} variant="outlined" onChange={handleFieldChange} />
        <TextField id="lastName" label='last Name' value={fields.lastName} variant="outlined" onChange={handleFieldChange}  />
        <Button variant="contained" color="primary">Save Changes</Button>
      </form>
    )

}))

export default NameForm