import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Home from '../Home/Home'
import Menu from '../Home/Menu'

const Container = inject('user')(observer((props) => {

    const { user } = props

    const history = useHistory()

    async function handleLogout() {
        await Auth.signOut()
        user.userHasAuthenticated(false)
        history.push('/')
    }

    return (
        <div>
            <Menu handleLogout={handleLogout} />
            <Home />
            {/* <Button onClick={props.handleLogout}>LOGOUT</Button>
            <h1>HELLOOOOO</h1> */}
        </div>
    )

}))

export default Container