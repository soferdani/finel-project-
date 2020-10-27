import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, InputAdornment, InputBase, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import { Auth } from 'aws-amplify'
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import logo from '../../HatchfulExport-All/logo_transparent.png'

const useStyles = makeStyles({
    paperCard:{
        width: '100%',
        padding: '20px',
        paddingBottom: '0px'
    },
    logo:{
        height: '200px'
    },
    inputContainer: {
        marginTop: '20px',
        marginBottom: '40px'
    },
    inputPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        padding: '3px',
        marginRight: '10px'
    }
})

export default function Login() {

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    const history = useHistory()

    const submit = async (e) => {
        try {

        const loginRes = await Auth.signIn(email, password)

        // localStorage.setItem("auth-token", loginRes.data.token)
    
        history.push("/home");
        } catch (err) {
            err.message && setError(err.message)
        }
    }
 

    return (
        <Grid item xs={12} md={4} container >
            <Paper elevation={3} className={classes.paperCard}>
                <Grid item xs={12} container justify='center' alignItems='center' direction='column'>
                    <img src={logo} alt='logo' className={classes.logo}/>
                    <Typography variant="h5">
                        Login
                    </Typography>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                    
                    <Grid item xs={8} className={classes.inputContainer}>
                        <Paper component="form" className={classes.inputPaper} > 
                            <EmailIcon className={classes.icon} />
                            <InputBase
                                className={classes.margin}
                                fullWidth
                                id="input-with-icon-textfield"
                                placeholder="Email"
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            /> 
                        </Paper> 
                    </Grid>

                    <Grid item xs={8} className={classes.inputContainer}>
                        <Paper component="form" className={classes.inputPaper} > 
                            <LockIcon className={classes.icon} />
                            <InputBase
                                className={classes.margin}
                                fullWidth
                                id="input-with-icon-textfield"
                                placeholder="Password"
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            /> 
                        </Paper> 
                    </Grid>

                </Grid>
                <Button onClick={submit} variant='contained'>LOGIN</Button>
            </Paper>
        </Grid>
    )
}