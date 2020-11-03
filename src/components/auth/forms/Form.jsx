import { Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import ErrorNotice from '../../misc/ErrorNotice'

const Form = inject('user')(observer((props) => {

    const { user, error, setError, fields, handleFieldChange, handleSubmit } = props
    const [types, setTypes] = useState([])
    useEffect(()=>{
        const getUserType = async () =>{
            const typeDB = await user.loadUserTypes()
            setTypes(typeDB);
        }
        getUserType()
    }, [])

    const validateForm = () => {
        return (
          fields.email.length > 0 &&
          fields.password.length > 0 &&
          fields.password === fields.confirmPassword &&
          fields.userType !== ""
        )
    }

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
                SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      },
                      getContentAnchorEl: null
                    }
                  }}
            >
                {types.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.type}
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

}))
export default Form