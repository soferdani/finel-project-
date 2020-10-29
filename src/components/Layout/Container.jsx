import { Grid } from '@material-ui/core'
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
        <Grid item xs={12} container>
            <Menu handleLogout={handleLogout} />
            <Home />
        </Grid>
    )

}))

export default Container