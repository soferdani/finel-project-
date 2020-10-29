import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import Home from '../Home/Home'
import Menu from './Menu'
import Calendar from '../Calendar/Calendar'

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
            </div>
        </Router>
    )

}))

export default Container