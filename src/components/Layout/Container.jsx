import { Button } from '@material-ui/core'
import React from 'react'
import Home from '../Home/Home'

export default function Container(props) {

    return (
        <div>
            <Home />
            {/* <Button onClick={props.handleLogout}>LOGOUT</Button>
            <h1>HELLOOOOO</h1> */}
        </div>
    )
}