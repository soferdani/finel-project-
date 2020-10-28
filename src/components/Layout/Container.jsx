import { Button } from '@material-ui/core'
import React from 'react'

export default function Container(props) {

    return (
        <div>
            <Button onClick={props.handleLogout}>LOGOUT</Button>
            <h1>HELLOOOOO</h1>
        </div>
    )
}