import { Button, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import ErrorNotice from "../misc/ErrorNotice";

const Signup = inject('user')(observer((props) => {

    const types = ['Manager', 'Electricity', 'Plumbing', 'Pool']

    const { user } = props

    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userType: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    })

    const history = useHistory()
    const [error, setError] = useState()
    const [newUser, setNewUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        return (
          fields.email.length > 0 &&
          fields.password.length > 0 &&
          fields.password === fields.confirmPassword &&
          fields.userType !== ""
        )
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const newUser = await Auth.signUp({
              username: fields.email,
              password: fields.password,
            })
            setIsLoading(false)
            setNewUser(newUser)
        } catch (err) {
            err.message && setError(err.message)
            setIsLoading(false)
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode)
            await Auth.signIn(fields.email, fields.password)
            user.userHasAuthenticated(fields.email, true)
            history.push("/home")
        } catch (err) {
            err.message && setError(err.message)
            setIsLoading(false)
        }
    }

    async function handleSendEmailAgain() {
        return await Auth.resendSignUp(fields.email)
    }

    async function handleFieldChange(event) {
        setFields({ ...fields, [event.target.name]: event.target.value})
    }

    function renderConfirmationForm() {
        return (
            <Grid>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <form autoComplete='given-name'>
                    <Typography variant="subtitle2">Confirmation Code</Typography>
                    <TextField
                        name="confirmationCode"
                        type="text"
                        value={fields.confirmationCode}
                        onChange={handleFieldChange}
                        helperText='Please check your email for the code'
                    />
                </form>
                <form onSubmit={handleConfirmationSubmit}>
                    <Grid>
                        <TextField
                            type='submit'
                            disabled={!validateConfirmationForm()}
                        />
                    </Grid>
                </form>
                <form onSubmit={handleConfirmationSubmit}>
                    <Typography variant='subtitle1'>
                        Didn't get our mail? <Button onClick={handleSendEmailAgain}>Send again</Button>
                    </Typography>
                </form>
            </Grid>
        )
    }
    
      function renderForm() {
        return (
            <Grid>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <form autoComplete='given-name'>
                    <Typography variant="subtitle2">First Name</Typography>
                    <TextField
                        name="firstName"
                        type="text"
                        value={fields.firstName}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='family-name'>
                    <Typography variant="subtitle2">Last Name</Typography>
                    <TextField
                        name="lastName"
                        type="text"
                        value={fields.lastName}
                        onChange={handleFieldChange}
                    /> 
                </form>
                <form autoComplete='email'>
                    <Typography variant="subtitle2">Email</Typography>
                    <TextField
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='tel'>
                    <Typography variant="subtitle2">Phone</Typography>
                    <TextField
                        name="phone"
                        type="tel"
                        value={fields.phone}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='new-password'>
                    <Typography variant="subtitle2">Password</Typography>
                    <TextField
                        name="password"
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='off'>
                    <Typography variant="subtitle2">Confirm Password</Typography>
                    <TextField
                        name="confirmPassword"
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </form>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select user type"
                    name='userType'
                    value={fields.userType}
                    onChange={handleFieldChange}
                    helperText="Please select your type"
                    >
                    {types.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <form onSubmit={handleSubmit}>
                    <TextField
                        disabled={!validateForm()}
                        type='submit'
                    />

                </form>
            </Grid>
        )
    }
    
      return (
        <div id="login-signup-card">
          {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
      )

}))

export default Signup