import { Grid, makeStyles, Typography, MenuItem, TextField, Button } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

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
    // const [messages, setMessages] = useState([])
    const [msg, setMsg] = useState({
        text: '',
        sender: user.id,
        getter: '',
        date: Date.now()
    })
    const socket = socketIOClient(ENDPOINT);
    useEffect(() => {
        socket.on('send', function (msg) {
            if(msg.getter === user.id){
                user.addNewMessage(msg.sender, msg)
            }
        });

    })

    const handleSend = () => {
        socket.emit('send', msg)
        user.addNewMessage(msg.getter, msg)
        setMsg({...msg, text: ''})
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
                        {s.firstName + " " + s.lastName}
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
                    rows={1}
                    variant="outlined"
                    name="img"
                    label="Property Imag URL"
                    type="text"
                    fullWidth
                    onChange={(e)=> setMsg({...msg, text: e.target.value})}
                />
            </Grid>

            <Grid item xs={12}>
            <Button onClick={handleSend}>Send</Button>
            {msg.getter &&
            user.serviceWorkers.find(s => s.id === msg.getter).messages.map(m=><div>{m.text}</div>)}
            </Grid>

        </Grid >
    )
}))
export default Chat