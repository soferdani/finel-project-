import { Grid, List, makeStyles, Snackbar, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect  } from 'react'


const useStyles = makeStyles((theme) => ({
    profileContainer: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 40,
            maxWidth: '70%'
        }
    },
    fields: {
        width: '100%'
    }
}))

// console.log("im gettrr");

const Todos = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()
    

    const [allTodos, setAllTodos] = useState ([])
    
    useEffect(() => {
        const feachDataFromDB = async () => {
            const allTodos = await user.loadUserAllTodos()
            console.log(allTodos);
        }
        feachDataFromDB()
    }, []) 
    



    return (
        <Grid className={classes.profileContainer} item xs={12} container>
            this is todos 
        </Grid>
    )

}))

export default Todos