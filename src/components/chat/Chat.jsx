import { Grid, makeStyles, Typography, MenuItem, TextField, Button } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import io from 'socket.io'

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '90%',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: 100,
          maxWidth: '90%',
          height: 600
        }
      }
}))

const Chat = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()
    const [msg, setMsg] = useState({
        text: '',
        sender: user.id,
        getter: '',
        date: Date.now()
    })
    useEffect(() => {
        const socket = io();
        socket.on('get', function (msg) {
            setMsg(msg)
        });

    })

    const handleSend = (msg) => {
        console.log(msg);
    }

    return (
        <Grid
            item
            xs={12}
            className={classes.container}>
                <Grid item xs={12}>
            <TextField
                id="outlined-select-currency"
                select
                label="Select Servicer From List"
                name='type'
                onChange={(e)=> setMsg({...msg, getter: e.target.value})}
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
                {user.serviceWorkers.map(s => (
                    <MenuItem id={s.id} value={s.id}>
                        {s.name}
                    </MenuItem>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
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
                    onChange={(e)=> setMsg({...msg, text: e.target.value})}
                />
            </Grid>

            <Grid item xs={12}>
            <Button onClick={handleSend}>Click</Button>
            </Grid>

        </Grid >
    )
}))
export default Chat