import { Grid, makeStyles, Typography, MenuItem } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'


const useStyles = makeStyles((theme) => ({
  cardDetails: {
    marginTop: '15px'
  },
  calendarContainer: {
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

  return (
    <Grid
      item
      xs={12}
      className={classes.cardDetails}>
    </Grid >
  )
}))
export default Chat