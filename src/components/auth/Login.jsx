import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, InputAdornment, InputBase, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import logo from '../../HatchfulExport-All/logo_transparent.png'

const useStyles = makeStyles({
    paper:{
        width: '100%'
    },
    logo:{
        height: '200px'
    },
    inputBox: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    iconBox: {
        backgroundColor: '#e76f51',
    }
})

export default function Login() {

    const classes = useStyles()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const history = useHistory();

    const submit = async (e) => {
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post(
                "http://localhost:3001/user/login",
                loginUser
            )

        localStorage.setItem("auth-token", loginRes.data.token)
    
        history.push("/home");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <Grid item xs={12} md={4} container justify='center' align='center'>
            <Paper elevation={3} className={classes.paper}>
                <Grid item xs={12} container direction='column'>
                    <Grid item xs={12}>
                        <img src={logo} alt='logo' className={classes.logo}/>
                        <Typography variant="h5">
                            Login
                        </Typography>
                        {error && (
                            <ErrorNotice message={error} clearError={() => setError(undefined)} />
                        )}
                        
                        <Grid item xs={7} className={classes.inputBox}>
                            <Paper > 
                                <EmailIcon />
                                <InputBase
                                    className={classes.margin}
                                    fullWidth
                                    id="input-with-icon-textfield"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                /> 
                            </Paper> 
                        </Grid>

                        <Grid item xs={7} container direction='row' className={classes.inputBox}>
                            <Grid 
                                item 
                                xs={2} 
                                container 
                                justify='center' 
                                alignItems='center'
                                className={classes.iconBox}
                            >
                                <LockIcon />
                            </Grid>
                            <Grid item xs={10}>
                                <InputBase
                                    fullWidth
                                    className={classes.margin}
                                    id="input-with-icon-textfield"
                                    placeholder="Password"
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /> 
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button onClick={submit} variant='contained'>LOGIN</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}