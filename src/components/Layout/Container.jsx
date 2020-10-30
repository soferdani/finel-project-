import { Grid } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import Home from '../Home/Home'
import Menu from './Menu'
import Calendar from '../Calendar/Calendar'
import Profile from '../settings/Profile'

const Container = inject('user')(observer((props) => {

    const { user } = props

    const history = useHistory()

    async function handleLogout() {
        await Auth.signOut()
        user.userHasAuthenticated(false)
        history.push('/login')
    }

    return (
        <Router>
            <div>
                <Menu handleLogout={handleLogout} />
                <Route path='/home' exact render={() => <Home />} />
                <Route path='/calendar' exact render={() => <Calendar />} />
                <Route path='/profile' exact render={() => <Profile />} />
            </div>
        </Router>
    )

}))

export default Container