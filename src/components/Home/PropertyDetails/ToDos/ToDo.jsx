import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { 
    Typography, 
    Grid,
    Paper,
    IconButton,
    Checkbox
} from '@material-ui/core'
import {
    Delete as DeleteIcon, 
    RadioButtonUnchecked as RadioButtonUncheckedIcon, 
    CheckCircle as CheckCircleIcon
} from '@material-ui/icons'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

const DoneCheckbox = withStyles({
    root: {
    color: '#023047',
      '&$checked': {
        color: '#023047',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
    toDoCard: {
        marginTop: '10px',
        backgroundColor: '#ffb703',
        maxWidth:'100%'
    },
    toDoComplete: {
        marginTop: '10px',
        backgroundColor: '#8ecae6',
        maxWidth:'100%'
    },
    taskContainer: {
        alignItems: 'center',
        paddingLeft: '5px'
    }
}))

const ToDo = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const { user, task, property } = props

    const handleCheck = async function() {
        user.updateTodoStatus(property, task.id)
    }

    const handleDelete = async function() {
        user.deleteTodo(property, task.id)
    }

    return (
        <Paper 
            elevation={3} 
            className={
                task.complete 
                    ? classes.toDoComplete 
                    : classes.toDoCard
            }
        >
            <Grid item xs={12} container className={classes.taskContainer} align='center' direction='row'>
                <Grid item xs={2} md={2}>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={3} md={5}>
                    <Typography variant='body2'>
                        {task.task}
                    </Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                    <Typography variant='body2'>
                        {task.type}
                    </Typography>
                </Grid>
                <Grid item xs={3} md={2} >
                    <Typography variant='body2'>
                        {moment(task.date).format('DD/MM/YY')}
                    </Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                    <DoneCheckbox 
                        onChange={handleCheck}
                        checked={task.complete}
                        className={classes.checkbox}
                        icon={<RadioButtonUncheckedIcon />} 
                        checkedIcon={<CheckCircleIcon />} 
                        name="checkedH" 
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}))

export default ToDo