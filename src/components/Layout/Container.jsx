import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Home from '../Home/Home'
import Menu from './Menu'

const Container = inject('user')(observer((props) => {

    const { user } = props

    const history = useHistory()

    async function handleLogout() {
        await Auth.signOut()
        user.userHasAuthenticated(false)
        history.push('/login')
    }

    return (
        <div>
            <Menu handleLogout={handleLogout} />
            <Home />
        </div>
    )

}))

export default Container